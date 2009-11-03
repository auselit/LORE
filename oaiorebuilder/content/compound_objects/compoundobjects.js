/*
 * Copyright (C) 2008 - 2009 School of Information Technology and Electrical
 * Engineering, University of Queensland (www.itee.uq.edu.au).
 * 
 * This file is part of LORE. LORE was developed as part of the Aus-e-Lit
 * project.
 * 
 * LORE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * LORE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * LORE. If not, see <http://www.gnu.org/licenses/>.
 */
 
/*
 * @include  "init.js"
 * @include  "../util.js"
 * @include "lore_explore.js"
 */

/** 
 * Compound objects
 * @namespace
 * @name lore.ore 
 */

// Compound object editor graph view defaults
/** Default width of new nodes in graphical editor 
 * @const */
lore.ore.NODE_WIDTH   = 220;
/** Default height of new nodes in graphical editor 
 * @const */
lore.ore.NODE_HEIGHT  = 170;
/** Default spacing between new nodes in graphical editor 
 * @const */
lore.ore.NODE_SPACING = 40;
/** Used for layout in graphical editor - Maximum width before nodes are positioned on new row 
 * @const */
lore.ore.MAX_X        = 400;

// TODO: replace with an ontology
/** Default list of properties that can be specified for compound objects or resources 
 * @const */
lore.ore.METADATA_PROPS = ["dcterms:abstract", "dcterms:audience", "dc:creator",
    "dcterms:created", "dc:contributor", "dc:coverage", "dc:description",
    "dc:format", "dcterms:hasFormat", "dc:identifier", "dc:language",
    "dcterms:modified", "dc:publisher", "dc:rights", "dc:source",
    "dc:subject", "dc:title"];
/** Properties that are mandatory for compound objects
 *  @const */
lore.ore.CO_REQUIRED = ["dc:creator","dcterms:created",

    "dcterms:modified", "ore:describes", "rdf:about", "rdf:type"
];
/** Properties that are mandatory for an aggregated resource
 *  @const */
lore.ore.RES_REQUIRED = ["resource"];
/** Properties that are mandatory for a relationship 
 * @const */
lore.ore.REL_REQUIRED = ["relationship", "namespace"];

/** Display an error message in the ORE statusbar 
 * @param {String} message The message to display */
lore.ore.ui.loreError = function(/*String*/message){
    lore.ore.ui.status.setStatus({
            'text': message,
            'iconCls': 'error-icon',
            'clear': {
                'wait': 3000
            }
    });
    lore.global.ui.loreError(message);
}
/**
 * Display an information message in the ORE statusbar
 * @param {String} message The message to display
 */
lore.ore.ui.loreInfo = function(/*String*/message) {
    lore.ore.ui.status.setStatus({
                'text': message,
                'iconCls': 'info-icon',
                'clear': {
                    'wait': 3000
                }
    });
    lore.global.ui.loreInfo(message);
}
/**
 * Display a warning message in the ORE statusbar
 * @param {String} message The message to display
 */
lore.ore.ui.loreWarning = function(/*String*/message){
    lore.ore.ui.status.setStatus({
        'text': message,
        'iconCls': 'warning-icon',
        'clear': {
            'wait': 3000
        }
    });
    lore.global.ui.loreWarning(message);
}
/**
 * Set the global variables for the repository access URLs
 *
 * @param {} rdfrepos The repository access URL
 * @param {}rdfrepostype The type of the repository (eg sesame, fedora)
 * @param {}annoserver The annotation server access URL
 */
lore.ore.setRepos = function(/*String*/rdfrepos, /*String*/rdfrepostype){
    /** The compound object repository access URL */
	lore.ore.reposURL = rdfrepos;
    /** The type of the compound object repository eg sesame, fedora */
	lore.ore.reposType = rdfrepostype; // type of compound object repository
}
/**
 * Set the DC Creator for the resource map
 * @param {String} creator
 */	
lore.ore.setDcCreator = function(creator){
    var remprops = lore.ore.ui.grid.getSource();
    remprops["dc:creator"] = creator;
    lore.ore.ui.grid.setSource(remprops);
    /** The name of the default creator used for dc:creator for annotations and compound objects */
    lore.defaultCreator = creator;
}
/** Handle click of search button in search panel */
lore.ore.keywordSearch = function(){
    lore.debug.ore("kw search triggered");
    lore.ore.search(null,null,Ext.getCmp("kwsearchval").getValue());
}

lore.ore.advancedSearch = function(){
    var searchform = Ext.getCmp("advsearchform").getForm();
    var searchuri = searchform.findField("searchuri").getValue();
    var searchpred = searchform.findField("searchpred").getValue();
    var searchval = searchform.findField("searchval").getValue();
    //var searchexact = searchform.findField("searchexact").getValue();
    lore.ore.search(searchuri, searchpred, searchval);
}

lore.ore.search = function (searchuri, searchpred, searchval){
    try{
    var searchtreeroot = Ext.getCmp("searchtree").getRootNode();
    lore.global.ui.clearTree(searchtreeroot);
    if (searchuri && searchuri != ""){
        searchuri = "<" + searchuri + ">";
    } else {
        searchuri = "?u";
    }
    if (searchpred && searchpred != ""){
        searchpred = "<" + searchpred + ">";
    } else {
        searchpred = "?p";
    }
    var filter = "";
    if (searchval && searchval != ""){
        filter = "FILTER regex(str(?v), \"" + searchval + "\")"
    } 
	var searchquery = lore.ore.reposURL
        + "?queryLn=sparql&query=" 
        + "select distinct ?g ?a ?c ?t ?v where {"
        + " graph ?g {" + escape(searchuri) + " " + searchpred + " ?v ."
        + filter + "} ."
        + "{?g <http://purl.org/dc/elements/1.1/creator> ?a} ."
        + "{?g <http://purl.org/dc/terms/created> ?c} ."
        + "OPTIONAL {?g <http://purl.org/dc/elements/1.1/title> ?t}}";
    lore.debug.ore("searchquery is",searchquery);
    var req = new XMLHttpRequest();
    req.open('GET', searchquery, true);
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.responseText && req.status != 204
                    && req.status < 400) {  
                var xmldoc = req.responseXML;
                var result = {};
                if (xmldoc) {
                    lore.debug.ore("compound object search results: sparql response", req);
                    result = xmldoc.getElementsByTagNameNS(
                            lore.constants.NAMESPACES["sparql"], "result");
                }
                for (var i = 0; i < result.length; i++) {
                    var theobj = new lore.ore.CompObjListing(result[i]);
                    if (!searchtreeroot.findChild('id',theobj.uri + 's')){
                       try{
	                       var res = theobj.match;
                           lore.debug.ore("the val matched is",res);
	                       var displayres = "";
	                       if (res) {
                            // display a snippet to show where search term occurs
		                       var idx = res.match(searchval).index;
		                       var s1 = ((idx - 15) < 0) ? 0 : idx - 15;
		                       var s2 = ((idx + 15) > (res.length))? res.length : idx + 15;
		                       displayres = " ("+ ((s1 > 0)?"..":"") + res.substring(s1,s2) 
	                            + ((s2 < (res.length))? "..":"")+ ")";
	                       }
	                       var tmpNode = new Ext.tree.TreeNode({
	                                'text' : theobj.title +  displayres,
	                                'id' : theobj.uri + 's',
	                                'uri' : theobj.uri,
	                                'qtip': "Created by " + theobj.creator + ", " + theobj.created,
	                                'iconCls' : 'oreresult',
	                                'leaf' : true,
	                                'draggable': true
	                        });
	                       searchtreeroot.appendChild(tmpNode);
	                       lore.ore.attachREMEvents(tmpNode);
                       } catch (ex){
                           lore.debug.ore("error creating search result",ex);
                       }
                    }
                }        
                if (!searchtreeroot.isExpanded()) {
                    searchtreeroot.expand();
                }    
            } else if (req.status = 404){
                lore.debug.ore("404 accessing compound object repository",req);
            }
        }
    }
    req.send(null);
    } catch (e){
        lore.debug.ore("exception in search",e);
    }
}

/**
 * Checks whether the compound object loaded in the editor has been modified
 * @return {Boolean} Returns true if the compound object has been modified
 */
lore.ore.compoundObjectDirty = function (){
    var isEmptyObject = function (ob){
       for(var i in ob){ if(ob.hasOwnProperty(i)){return false;}}
       return true;
    };
    // TODO: implement this method - compare lore.ore.loadedRDF with state of model
    if (isEmptyObject(lore.ore.loadedRDF)){
        return false;
    } else {
        return true;
    }
}

/** Initialize a new compound object in the editor, prompting first whether to save the current compound object */
lore.ore.createCompoundObject = function (){
    var newCO = function (){
        var today = new Date();
        lore.ore.ui.grid.setSource({
                    "rdf:about" : lore.ore.generateID(),
                    "ore:describes" : "#aggregation",
                    "dc:creator" : lore.defaultCreator,
                    "dcterms:modified" : today,
                    "dcterms:created" : today,
                    "rdf:type" : lore.constants.RESOURCE_MAP,
                    "dc:title" : ""
        });
        lore.ore.ui.initGraphicalView();
    };
    try{
        // Check if the currently loaded compound object has been modified and if it has prompt the user to save changes
	    if (lore.ore.compoundObjectDirty()){
	        Ext.Msg.show({
		        title : 'Save Compound Object?',
		        buttons : Ext.MessageBox.YESNOCANCEL,
		        msg : 'Would you like to save the compound object before proceeding?<br><br>Any unsaved changes will be lost if you select "No".',
		        fn : function(btn) {
		            if (btn === 'yes') {
                        // TODO: check that the save completed successfully before calling newCO
		                lore.ore.saveRDFToRepository();
		                newCO();  
		            } else if (btn === 'no') {
                        newCO();
                    }
		        }
		    });
        } else {
            newCO();
        }
    } catch (e){
        lore.debug.ore("Error in createCompoundObject",e);
    }
}

/** Actions performed when lore Compound Objects panel is shown */
lore.ore.onShow = function () {
	lore.ore.ui.lorevisible = true;	
	if (lore.ore.ui.currentURL && lore.ore.ui.currentURL != 'about:blank' &&
		lore.ore.ui.currentURL != '' &&
		(!lore.ore.ui.loadedURL || lore.ore.ui.currentURL != lore.ore.ui.loadedURL)) {
			lore.ore.updateCompoundObjectsSourceList(lore.ore.ui.currentURL);
			lore.ore.ui.loadedURL = lore.ore.ui.currentURL;
		}
}
/** Actions performed when lore Compound Objects panel is hidden */
lore.ore.onHide = function () {
	lore.ore.ui.lorevisible = false;
}

// alias used by uiglobal
// TODO: change this to addNode - make it add to model and get view to listen on model
lore.ore.addFigure = function (/*URL*/theURL) {
	lore.ore.graph.addFigure(theURL);
}

/**
 * Remove listeners and reference to a Compound Object view if it is closed
 * 
 * @param {Object} tabpanel
 * @param {Object} panel
 */
lore.ore.closeView = function(/*Ext.TabPanel*/tabpanel, /*Ext.panel*/panel) {
    lore.debug.ore("close view " + panel.id,panel);
    // remove listeners
    var tab = Ext.getCmp(panel.id);
    if (panel.id == 'remrdfview') {
        tab.un("activate", lore.ore.updateRDFHTML);     
    }
    else if (panel.id == 'remsmilview') {
        tab.un("activate", lore.ore.showSMIL);   
    }
    else if (panel.id == 'remfoxmlview') {
        tab.un("activate",lore.ore.updateFOXML);
    }
    else if (panel.id == 'remtrigview') {
        tab.un("activate",lore.ore.updateTriG);
    }
    return true;
}
lore.ore.ui.hideProps = function(p, animate){
        p.body.setStyle('display','none');
       
};
lore.ore.ui.showProps = function(p, animate){
        p.body.setStyle('display','block');
};

/** Handler for plus tool button on property grids */
lore.ore.ui.addProperty = function (ev, toolEl, panel){
    var makeAddMenu  = function(panel){
	    panel.propMenu = new Ext.menu.Menu({
	        id: panel.id + "-add-metadata"
	    });
        panel.propMenu.panelref = panel.id;
	    for (var i = 0; i < lore.ore.METADATA_PROPS.length; i++) {
            var propname = lore.ore.METADATA_PROPS[i];
            panel.propMenu.add({
                id: panel.id + "-add-" + propname,
                text: propname,
                handler: function (){
                    try{
	                    var panel = Ext.getCmp(this.parentMenu.panelref);
	                    var props = panel.getSource();
	                    if (props && !props[this.text]){
	                        props[this.text] = "";
	                    }
	                    panel.setSource(props);
                    } catch (ex){
                        lore.debug.ore("exception adding prop " + this.text,ex);
                    }
                }
            });
	    }
	}
    if (!panel.propMenu){
        makeAddMenu(panel);
    }
    if (panel.collapsed){
        panel.expand(false);
    }
    panel.propMenu.showAt(ev.xy);
}
/** Handler for minus tool button on property grids */
lore.ore.ui.removeProperty = function (ev, toolEl, panel){ 
    lore.debug.ore("remove Property was triggered",ev);
    var sel = panel.getSelectionModel().selection;
    // don't allow delete when panel is collapsed (user can't see what is selected)
    if (panel.collapsed){
        lore.ore.ui.loreInfo("Please expand the properties panel and select the property to remove");
    } else if (sel){
             if ((panel.id == "remgrid" && lore.ore.CO_REQUIRED.indexOf(sel.record.data.name)!=-1) ||
                (panel.id == "nodegrid" && 
                    (lore.ore.RES_REQUIRED.indexOf(sel.record.data.name) !=-1 ||
                        lore.ore.REL_REQUIRED.indexOf(sel.record.data.name)!=-1))){
                lore.ore.ui.loreWarning("Cannot remove mandatory property: " + sel.record.data.name);
            } else {
                //panel.getStore().remove(sel.record); // doesn't seem to be working
                lore.debug.ore("deleting the property",panel.collapsed);
                var props = panel.getSource();
                delete props[sel.record.data.name];
                panel.setSource(props);
            }
     } else {
        lore.ore.ui.loreInfo("Please click on the property to remove prior to selecting the remove button");
     }
}
/** Handler for help tool button on property grids */
lore.ore.ui.helpProperty = function (ev,toolEl, panel){
    var sel = panel.getSelectionModel().selection;
    if (panel.collapsed){
        lore.ore.ui.loreInfo("Please expand the properties panel and select a property");
    } else if (sel){
        var splitprop =  sel.record.data.name.split(":");
        var infoMsg = "<p style='font-weight:bold;font-size:130%'>" + sel.record.data.name + "</p><p style='font-size:110%;margin:5px;'>" 
        + sel.record.data.value + "</p>";
        if (splitprop.length > 1){
            var ns = lore.constants.NAMESPACES[splitprop[0]]
            infoMsg += "<p>This property is defined in " 
                    + "<a style='text-decoration:underline' href='#' onclick='lore.global.util.launchTab(\"" 
                    + ns + "\");'>" + ns + "</a></p>";
        }
        
        Ext.Msg.show({
                title : 'About ' + sel.record.data.name,
                buttons : Ext.MessageBox.OK,
                msg : infoMsg
            });
    } else {
        lore.ore.ui.loreInfo("Please click on a property prior to selecting the help button");
    }
}

/** Helper function to create a view displayed in a closeable tab */
lore.ore.openView = function (/*String*/panelid,/*String*/paneltitle,/*function*/activationhandler){
    var tab = Ext.getCmp(panelid);
    if (!tab) {
       tab = lore.ore.ui.oreviews.add({
            'title' : paneltitle,
            'id' : panelid,
            'autoScroll' : true,
            'closable' : true
        });
        tab.on("activate", activationhandler);
    }
    tab.show();
}

/** Displays a summary of the resource URIs aggregated by the compound object 
 * @parm {Ext.Panel} summarypanel The panel to show the summary in */
lore.ore.showCompoundObjectSummary = function(/*Ext.Panel*/summarypanel) {
    var remprops = lore.ore.ui.grid.getSource();

    var newsummary = "<table style='font-size:smaller;border:none'>"
            + "<tr valign='top'><td width='20%'><b>Compound object:</b></td><td>"
            + remprops["rdf:about"] + "</td></tr>";
    if (remprops["dc:title"]) {
        newsummary += "<tr valign='top'><td width='20%'><b>Title:</b></td><td>"
                + remprops["dc:title"] + "</td></tr>";
    }
    if (remprops["dc:description"]) {
        newsummary += "<tr valign='top'><td><b>Description:</b></td><td width='80%'>"
                + remprops["dc:description"] + "</td></tr>";
    }
    newsummary += "</table>";
    newsummary += "<div style='padding-top:1em'><p><b>List of contents:</b></p><ul>";
    var allfigures = lore.ore.graph.Graph.getDocument().getFigures();
    for (var i = 0; i < allfigures.getSize(); i++) {
        var fig = allfigures.get(i);
        var figurl = lore.global.util.escapeHTML(fig.url);
        var title = fig.metadataproperties["dc:title"];
        newsummary += "<li>" + (title? title + ": " : "") 
        + "<a onclick='lore.global.util.launchTab(\"" + figurl + "\");' href='#'>&lt;" 
        + figurl + "&gt;</a></li>";
    }
    newsummary += "</ul></div>";
    summarypanel.body.update(newsummary);
    lore.ore.ui.loreInfo("Displaying a summary of compound object contents");
}

/** Generate a SMIL presentation from the current compound object and display a link to launch it */
lore.ore.showSMIL = function() {
    
    var allfigures = lore.ore.graph.Graph.getDocument().getFigures();
    var numfigs = allfigures.getSize();
    var smilcontents = "<p><a title='smil test hover' href='http://www.w3.org/AudioVideo/'>SMIL</a> is the Synchronized Multimedia Integration Language.</p>";
    if (numfigs > 0) {
        var smilpath = lore.ore.createSMIL(); // generate the new smil file
        // into oresmil.xsl
        smilcontents += "<p>A SMIL slideshow has been generated from the contents of the current compound object.</p><p>"
                + "<a onclick='lore.global.util.launchWindow(this.href, false, window);return(false);' target='_blank' href='file://"
                + smilpath
                + "'>Click here to launch the slideshow in a new window</a><br/>";
    } else {
        smilcontents += "<p>Once you have added some resources to the current compound object a SMIL presentation will be available here.</p>";
    }
    Ext.getCmp("remsmilview").body.update(smilcontents);
    lore.ore.ui.loreInfo("Display a multimedia presentation generated from the compound object contents");
}
/** Render the current compound object as RDF/XML in the RDF view */
lore.ore.updateRDFHTML = function() {
    Ext.getCmp("remrdfview").body.update(lore.ore.createRDF(true));
}
lore.ore.refreshTabularEditor = function (panel){
    lore.debug.ore("the tabular editor",panel);
    // create table if it does not exist, otherwise refresh it
    
}
/** Render the current compound object as Fedora Object XML in the FOXML view */
lore.ore.updateFOXML = function (){
    Ext.getCmp("remfoxmlview").body.update(Ext.util.Format.htmlEncode(lore.ore.createFOXML()));
}
/** Render the current compound object in TriG format in the TriG view*/
lore.ore.updateTriG = function (){
    Ext.getCmp("remtrigview").body.update("<pre>" + Ext.util.Format.htmlEncode(lore.ore.serializeREM('trig')) + "</pre>");
}
/** Generate a slideshow representing the current compound object */
lore.ore.showSlideshow = function (){
    var allfigures = lore.ore.graph.Graph.getDocument().getFigures();
    var numfigs = allfigures.getSize();
		
    var sscontents = "";
    var carouselel = Ext.get("trailcarousel");
    try{
    var params = {
    "width": carouselel.getWidth(),
    "height": (carouselel.getHeight() - 29)}; // minus 29 to account for slide nav bar
    sscontents += lore.ore.transformORERDF("chrome://lore/content/compound_objects/stylesheets/slideshow_view.xsl",params,true);
    lore.debug.ore("slideshow html is",sscontents);
	carouselel.update(sscontents);
    lore.ore.ui.carousel.reloadMarkup();
    } catch (ex){
        lore.debug.ore("adding slideshow",ex);
    }
}
/** Generate a visualisation to explore compound object connections */
lore.ore.showExploreUI = function(){
    try{
    if (lore.ore.exploreLoaded !== lore.ore.currentREM) {
        lore.debug.ore("show in explore view", lore.ore.currentREM);
        lore.ore.exploreLoaded = lore.ore.currentREM;
        lore.ore.explore.showInExploreView(lore.ore.currentREM, lore.ore.ui.grid.getSource()["dc:title"]);
    } else {
        lore.debug.ore("refresh explore view");
        lore.ore.explore.rg.refresh();
    }
    }catch(e){lore.debug.ore("error in showExploreUI",e);}
    lore.ore.ui.loreInfo("Click on the nodes to explore connections between compound objects.");
}
/**
 * Stores basic metadata about a compound object for the results listing
 * @param {XMLNode} result
 */
lore.ore.CompObjListing = function(/*Node*/result){
    var bindings;
    var node;
    var attr;
    var nodeVal;
    this.title = "Untitled";
    this.creator = "Anonymous";
    try {  
       bindings = result.getElementsByTagName('binding');
       for (var j = 0; j < bindings.length; j++){  
        attr = bindings[j].getAttributeNode('name');
        if (attr.nodeValue =='g'){ //graph uri
            node = bindings[j].getElementsByTagName('uri'); 
            this.uri = lore.global.util.safeGetFirstChildValue(node);
        } else if (attr.nodeValue == 'v'){
            node = bindings[j].getElementsByTagName('literal');
            nodeVal = lore.global.util.safeGetFirstChildValue(node);
            if (!nodeVal){
                node = bindings[j].getElementsByTagName('uri');
            }
            this.match = lore.global.util.safeGetFirstChildValue(node);
        } else {
            node = bindings[j].getElementsByTagName('literal');
            nodeVal = lore.global.util.safeGetFirstChildValue(node);
            if (attr.nodeValue == 't' && nodeVal){ //title
                this.title = nodeVal;
            } else if (attr.nodeValue == 'a' && nodeVal){// dc:creator
                this.creator = nodeVal;
            } else if (attr.nodeValue == 'c' && nodeVal){ // dcterms:created
                this.created = nodeVal;
            } 
        }
       }
    } catch (ex) {
        lore.debug.ore("Unable to process compound object result list", ex);
    }
}
/** Prompt for location to save serialized compound object and save as file
 * @param {String} format The format to which to serialize (rdf, wordml, foxml or trig)
 */
lore.ore.handleSerializeREM = function (format) {
    var fileExtensions = {
        "rdf": "xml",
        "wordml": "xml",
        "foxml": "xml",
        "trig": "txt"  
    }
	try {
        if (!format) {
            format = "rdf";
        }
		var fObj = lore.global.util.writeFileWithSaveAs("Export Compound Object as", fileExtensions[format], 
												function(){	return lore.ore.serializeREM(format);},window);
		if ( fObj ) {
			lore.ore.ui.loreInfo("Successfully saved Compound Object data to " +fObj.fname);
		}											
	} catch (e) {
		lore.debug.ore("Error saving Compound Objects data: " + e,e );
		lore.ore.ui.loreError("Error saving Compound Object: " + e);
	}
}
lore.ore.serializeREM = function(format) {
    if ('foxml' == format) {
        return lore.ore.createFOXML();
    } else if ('wordml' == format){
        return lore.ore.createOREWord();
    }
    // TODO: remove the first line once compound object is stored as rdfquery store
    var rdf = lore.ore.createRDF(false);
    var rdfDoc = new DOMParser().parseFromString(rdf, "text/xml");
        var databank = jQuery.rdf.databank();
        for (ns in lore.constants.NAMESPACES){
            databank.prefix(ns,lore.constants.NAMESPACES[ns]);
        }
        databank.load(rdfDoc);
    if (format == 'trig') {
       var result = "<" + lore.ore.ui.grid.getSource()["rdf:about"] + ">\n{\n";
       var triples = databank.triples();
       for (var t = 0; t < triples.length; t++){
        var triple = triples[t];
        result += triple.toString() + "\n"; 
       }
       result += "}\n";
       return result;
    } else {
        return databank.dump({format:'application/rdf+xml',serialize:true});
    }
}
/**
 * Create the RDF/XML of the current compound object
 * 
 * @param {Boolean} escape Indicates whether to escape the results for rendering as HTML
 * @return {String} The RDF/XML as a string
 */
lore.ore.createRDF = function(/*boolean*/escape) {
    /*
     * Helper function that serialises a property to RDF/XML propname The name
     * of the property to serialise properties All of the properties ltsymb Less
     * than symbol nlsymb New line symbol returns The RDF/XML representation of
     * the property
     */
    var serialise_property = function(propname, properties, ltsymb, nlsymb) {
        var result = "";
        var propval = properties[propname];
        if (propval != null && propval != '') {
            result = ltsymb + propname + ">";
            if (nlsymb == "<br/>" && propval) {
                try {
                    result += lore.global.util.escapeHTML(propval.toString());
                } catch (e) {
                    lore.debug.ore("error in serialise_property",e);
                    lore.ore.ui.loreWarning(e.toString());
                }
            } else {
                result += propval;
            }
            result += ltsymb + "/" + propname + ">" + nlsymb;
        }
        return result;
    };
    var ltsymb = "<";
    var nlsymb = "\n";
    if (escape) {
        ltsymb = "&lt;";
        nlsymb = "<br/>";
    }
    var remprops = lore.ore.ui.grid.getSource();
    var modifiedDate = new Date();
    remprops["dcterms:modified"] = modifiedDate;
    lore.ore.ui.grid.setSource(remprops);
    var describes = remprops["ore:describes"];
    var rdfabout = remprops["rdf:about"];

    // RDF fragments
    var rdfdescabout = "rdf:Description rdf:about=\"";
    var closetag = "\">" + nlsymb;
    var fullclosetag = "\"/>" + nlsymb;
    var rdfdescclose = "/rdf:Description>";

    // create RDF for resource map: modified and creator are required
    var rdfxml = ltsymb + "?xml version=\"1.0\" encoding=\"UTF-8\" ?>" + nlsymb
            + ltsymb + 'rdf:RDF ' + nlsymb;
    for (var pfx in lore.constants.NAMESPACES) {
        rdfxml += "xmlns:" + pfx + "=\"" + lore.constants.NAMESPACES[pfx]
                + "\"" + nlsymb;
    }
    var monthString = modifiedDate.getMonth() + 1 + "";
    if (monthString.length < 2){
        monthString = '0' + monthString;
    }
    var dayString = modifiedDate.getDate() + "";
    if (dayString.length < 2){
        dayString = "0" + dayString;
    }
    rdfxml += "xml:base = \"" + rdfabout + "\">" + nlsymb + ltsymb
            + rdfdescabout + rdfabout + closetag + ltsymb
            + "ore:describes rdf:resource=\"" + describes + fullclosetag
            + ltsymb + 'rdf:type rdf:resource="' + lore.constants.RESOURCE_MAP
            + '" />' + nlsymb + ltsymb + 'dcterms:modified rdf:datatype="'
            + lore.constants.NAMESPACES["xsd"] + 'date">'
            + modifiedDate.getFullYear() + "-" + monthString
            + "-" + dayString + ltsymb + "/dcterms:modified>"
            + nlsymb;
    var created = remprops["dcterms:created"]; 
    if (created != null && created instanceof Date) {
        monthString = created.getMonth() + 1 + "";
        if (monthString.length < 2){
            monthString = '0' + monthString;
        }
        dayString = created.getDate() + "";
	    if (dayString.length < 2){
	        dayString = "0" + dayString;
	    }
        rdfxml += ltsymb + 'dcterms:created rdf:datatype="'
                + lore.constants.NAMESPACES["xsd"] + 'date">'
                + created.getFullYear() + "-" + monthString + "-"
                + dayString + ltsymb + "/dcterms:created>" + nlsymb;
    } 
    else if (created != null) {
        rdfxml += ltsymb + 'dcterms:created rdf:datatype="'
                + lore.constants.NAMESPACES["xsd"] + 'date">'
                + created + ltsymb + "/dcterms:created>" + nlsymb;
    }
    for (var i = 0; i < lore.ore.METADATA_PROPS.length; i++) {
        var theprop = lore.ore.METADATA_PROPS[i];
        if (theprop != 'dcterms:modified' && theprop != 'dcterms:created') {
            rdfxml += serialise_property(theprop, remprops, ltsymb, nlsymb);
        }
    }
    rdfxml += ltsymb + rdfdescclose + nlsymb;

    // create RDF for aggregation
    var aggreprops = {
        "rdf:type" : lore.constants.NAMESPACES["ore"] + "Aggregation"
    };
    rdfxml += ltsymb + rdfdescabout + describes + closetag + ltsymb
            + "rdf:type rdf:resource=\"" + aggreprops["rdf:type"]
            + fullclosetag;
    // TODO: any other types for aggregation eg Journal Article

    for (i = 0; i < lore.ore.all_props.length; i++) {
        rdfxml += serialise_property(lore.ore.all_props[i], aggreprops, ltsymb,
                nlsymb);
    }
    var allfigures = lore.ore.graph.Graph.getDocument().getFigures();
    var resourcerdf = "";
    for (i = 0; i < allfigures.getSize(); i++) {
        var fig = allfigures.get(i);
        var figurl = lore.global.util.escapeHTML(fig.url.toString().replace('<', '%3C').replace('>', '%3E'))
        rdfxml += ltsymb + "ore:aggregates rdf:resource=\"" + figurl
                + fullclosetag;
        // create RDF for resources in aggregation
        // TODO: resource properties eg dcterms:hasFormat, ore:isAggregatedBy
        for (var mprop in fig.metadataproperties) {
            if (mprop != 'resource' && !mprop.match('undefined')) {
                var mpropval = fig.metadataproperties[mprop];
                if (mpropval && mpropval != '') {
                    resourcerdf += ltsymb + rdfdescabout + figurl + closetag
                            + ltsymb + mprop + ">" + mpropval + ltsymb + "/"
                            + mprop + ">" + nlsymb + ltsymb + rdfdescclose
                            + nlsymb;
                }
            }
        }
        /* persist node layout */

        var objframe = window.frames[fig.url + "-data"];
        resourcerdf += ltsymb + rdfdescabout + figurl + closetag + ltsymb
                + "layout:x>" + fig.x + ltsymb + "/" + "layout:x>" + nlsymb
                + ltsymb + "layout:y>" + fig.y + ltsymb + "/" + "layout:y>"
                + nlsymb + ltsymb + "layout:width>" + fig.width + ltsymb + "/"
                + "layout:width>" + nlsymb + ltsymb + "layout:height>"
                + fig.height + ltsymb + "/" + "layout:height>" + nlsymb
                + ltsymb + "layout:originalHeight>" + fig.originalHeight
                + ltsymb + "/" + "layout:originalHeight>" + nlsymb;
        
        if (objframe && (objframe.scrollX != 0 || objframe.scrollY != 0)) {
            resourcerdf += ltsymb + "layout:scrollx>" + objframe.scrollX
                    + ltsymb + "/" + "layout:scrollx>" + nlsymb + ltsymb
                    + "layout:scrolly>" + objframe.scrollY + ltsymb + "/"
                    + "layout:scrolly>" + nlsymb;
        }
        resourcerdf += ltsymb + rdfdescclose + nlsymb;
        
        // iterate over all ports' connections and serialize if this fig is the source of the connection
        var ports = fig.getPorts();
        for (var p = 0; p < ports.getSize(); p++){
            var outgoingconnections = ports.get(p).getConnections();
            for (var j = 0; j < outgoingconnections.getSize(); j++) {
	            var theconnector = outgoingconnections.get(j);
                if (figurl == lore.global.util.escapeHTML(theconnector.sourcePort.parentNode.url)){
	               var relpred = theconnector.edgetype;
	               var relns = theconnector.edgens;
	               var relobj = lore.global.util.escapeHTML(theconnector.targetPort.parentNode.url);
	               resourcerdf += ltsymb + rdfdescabout + figurl + closetag + ltsymb
	                    + relpred + " xmlns=\"" + relns + "\" rdf:resource=\""
	                    + relobj + fullclosetag + ltsymb + rdfdescclose + nlsymb;
                }
	        }
        }    
    }
    rdfxml += ltsymb + rdfdescclose + nlsymb;
    rdfxml += resourcerdf;
    rdfxml += ltsymb + "/rdf:RDF>";
    return rdfxml;
}

lore.ore.generateID = function(){
    // TODO: should use a persistent identifier service to request an identifier
    return "http://austlit.edu.au/rem/" + draw2d.UUID.create();
}

/**
 * Load a compound object into the graphical view
 * @param {} rdf XML doc or XML HTTP response containing the compound object (RDF/XML)
 * @param {} showInTree boolean indicating whether to display in the recently viewed tree
 */
lore.ore.loadCompoundObject = function (rdf) {
    var nsprefix = function(ns) {
        for (var prefix in lore.constants.NAMESPACES) {
            if (lore.constants.NAMESPACES[prefix] == ns) {
                return prefix + ":";
            }
        }
    };
    var showInTree = false;
    try {
        // reset the graphical view
        lore.ore.ui.initGraphicalView();
        
        lore.ore.ui.oreviews.activate("drawingarea");
        var rdfDoc;
        if (typeof rdf != 'object'){ 
	       rdfDoc = new DOMParser().parseFromString(rdf, "text/xml");
        } else {
            showInTree = true;
            rdfDoc = rdf.responseXML;
        }
	    var databank = jQuery.rdf.databank();
        for (ns in lore.constants.NAMESPACES){
            databank.prefix(ns,lore.constants.NAMESPACES[ns]);
        }
	    databank.load(rdfDoc);
        /** rdfquery triplestore that stores the original RDF triples that were loaded for a compound object */
        lore.ore.loadedRDF = jQuery.rdf({databank: databank});
        
        // Display the properties for the compound object
	    var remQuery = lore.ore.loadedRDF.where('?rem rdf:type <' + lore.constants.RESOURCE_MAP + '>');
        var remurl, res = remQuery.get(0);
        if (res){
	       remurl = res.rem.value.toString();
        }  else {
            lore.ore.ui.loreWarning("No compound object found");
            lore.debug.ore("no remurl found in RDF",lore.ore.loadedRDF);
            lore.debug.ore("the input rdf was",rdf); 
        }
	    var theprops = {
	        "rdf:about" : remurl,
	        "ore:describes" : "#aggregation"
	    };
        lore.ore.loadedRDF.about('<' + remurl + '>')
            .each(function(){
                var propurl = this.property.value.toString();
                var propsplit = lore.global.util.splitTerm(propurl);
                var propname = nsprefix(propsplit.ns);
                if (propname){
                    propname = propname + propsplit.term;
                } else {
                    propname = propurl;
                }
                //lore.debug.ore("rem props " + propname + " " + this.value.toString(),this);
                theprops[propname] = this.value.value.toString();
            });
	     lore.ore.ui.grid.setSource(theprops);
         
         
        // create a node figure for each aggregated resource, restoring the layout
        lore.ore.loadedRDF.where('<' + remurl + "#aggregation" + '> ore:aggregates ?url')
            .optional('?url layout:x ?x')
            .optional('?url layout:y ?y')
            .optional('?url layout:width ?w')
            .optional('?url layout:height ?h')
            .optional('?url layout:originalHeight ?oh')
            .optional('?url layout:scrollx ?sx')
            .optional('?url layout:scrolly ?sy')
            .optional('?url dc:format ?format')
            .each(function(){
             var resourceURL = this.url.value.toString(); 
             lore.debug.ore("found aggregated resource " + resourceURL,this);
             var fig;
             
             if (this.x && this.y) {
                var opts = {};
                for (prop in this) {
                    if (prop != 'url' && prop != 'format'){
                        opts[prop] = parseInt(this[prop].value);
                    } else {
                        opts[prop] = this[prop].value.toString();
                    }
                }
                if (opts.x < 0){
                    opts.x = 0;
                }
                if (opts.y < 0) {
                    opts.y = 0;
                }
                fig = lore.ore.graph.addFigureWithOpts(opts);
             } else {
                fig = lore.ore.graph.addFigure(resourceURL);
             } 
        });
        
        // iterate over all predicates to create node connections and properties
        lore.ore.loadedRDF.where('?subj ?pred ?obj')
            .filter(function(){
                // filter out the layout properties and predicates about the resource map
                if (this.pred.value.toString().match(lore.constants.NAMESPACES["layout"]) 
                    || this.subj.value.toString().match(remurl)) return false;
                else return true;
            })
            .each(function(){  
                // try to find a node that this predicate applies to 
                var subject = this.subj.value.toString()
                var srcfig = lore.ore.graph
                    .lookupFigure(subject);
                if (!srcfig) {
                   srcfig = lore.ore.graph
                    .lookupFigure(lore.global.util.unescapeHTML(subject.replace(
                    '%3C', '<').replace('%3F', '>')));
                }
                if (srcfig) {
                    var relresult = lore.global.util.splitTerm(this.pred.value.toString());
                    var obj = this.obj.value.toString()
                    var tgtfig = lore.ore.graph.lookupFigure(obj);
                    if (!tgtfig) {
                        tgtfig = lore.ore.graph
                            .lookupFigure(lore.global.util.unescapeHTML(obj.replace(
                                        '%3C', '<').replace('%3F', '>')));
                    }
                    if (tgtfig) { // this is a connection
                        var c = new lore.ore.graph.ContextmenuConnection();
                        c.setSource(srcfig.getPort("output"));
                        c.setTarget(tgtfig.getPort("input"));
                        c.setRelationshipType(relresult.ns, relresult.term);
                        lore.ore.graph.Graph.addFigure(c);
                    } else  { 
                        // not a node relationship, show in the property grid 
                        srcfig.metadataproperties[nsprefix(relresult.ns) + relresult.term] = obj;
                        if (relresult.term == "title") {
                            srcfig.setTitle(obj);
                        }
                    }
                }
            }
        );

        lore.ore.ui.loreInfo("Loading compound object");
        lore.ore.currentREM = remurl;
       
       if (showInTree && !lore.ore.ui.recenttreeroot.findChild('id',remurl + 'r')){
	        var title = theprops["dc:title"] ? theprops["dc:title"] : "Untitled";
	        var recentNode = new Ext.tree.TreeNode({
	            'text' : title,
	            'id': remurl + 'r',
	            'uri': remurl,
	            'iconCls' : 'oreresult',
	            'leaf' : true,
                'draggable' : true
	        });
	        lore.ore.attachREMEvents(recentNode);
	        var childNodes = lore.ore.ui.recenttreeroot.childNodes;
	        if (childNodes.length >= 5) {
	            lore.ore.ui.recenttreeroot
	                .removeChild(lore.ore.ui.recenttreeroot.firstChild);
	        }
	        lore.ore.ui.recenttreeroot.appendChild(recentNode);
       }
    } catch (e){
        lore.ore.ui.loreError("Error loading compound object");
        lore.debug.ore("exception loading RDF from string",e);
        lore.debug.ore("the RDF string was",rdf);
        lore.debug.ore("the serialized databank is",databank.dump({format:'application/rdf+xml', serialize: true}));
    }
}

/**
 * Loads a ORE resource map from a URL into the graphical view and property panels
 * 
 * @param {String} rdfURL The direct URL to the RDF (eg restful web service on repository that returns RDF)
 */
lore.ore.readRDF = function(rdfURL){
    Ext.Ajax.request({
            url: rdfURL,
            method: "GET",
            disableCaching: false,
            success: lore.ore.loadCompoundObject,
            failure: function(resp, opt){
                lore.debug.ore("Unable to load compound object " + opt.url, resp);
            }
        }); 
}

/** set up listeners for events in the compound objects tree */
lore.ore.attachREMEvents = function(node){  
    node.on('dblclick', function(node) {
         lore.ore.readRDF(node.attributes.uri);
    });
    node.on('contextmenu', function(node, e) {
        node.select();
        if (!node.contextmenu) {
            node.contextmenu = new Ext.menu.Menu({
                        id : node.attributes.uri + "-context-menu"
                    });
           node.contextmenu.add({
                text : "Edit compound object",
                handler : function(evt) {
                    lore.ore.readRDF(node.attributes.uri);
                }
            });
            node.contextmenu.add({
                text : "Delete compound object",
                handler : function(evt) {
                    lore.ore.deleteFromRepository(node.attributes.uri,node.text);
                }
            });
            node.contextmenu.add({
                text : "Add as node in compound object editor",
                handler : function(evt) {
                    lore.ore.graph
                            .addFigure(lore.ore.reposURL
                                    + "/statements?context=<"
                                    + node.attributes.uri + ">");
                }
            });
            
        }
        node.contextmenu.showAt(e.xy);
    });
}

/**
 * Takes a repository access URI and returns the resource map identifier This is
 * only necessary until we implement proper access of resource maps via their
 * identifier URI
 * 
 * @param {}
 *            theurl
 * @return {}
 */
lore.ore.getOREIdentifier = function(url) {
    // Example of the url :
    // http://austlit.edu.au/openrdf-sesame/repositories/lore/statements?context=<http://austlit.edu.au>
    var result;
    var theurl = url.toString().replace('%3C', '<').replace('%3E', '>');
    if (theurl && theurl.indexOf('>') >= 0 ) {
        result = theurl.substring((theurl.indexOf('<') + 1),
                (theurl.length - 1));
    }
    if (result) {
        return result;
    } else {
        return theurl;
    }
}
/**
 * Load a resource map directly from a URL - prompt the user to enter the URL
 */
lore.ore.loadRDF = function() {
    Ext.Msg.show({
                title : 'Load RDF',
                buttons : Ext.MessageBox.OKCANCEL,
                msg : 'Please enter the URL of the compound object:',
                fn : function(btn, theurl) {
                    if (btn == 'ok') {
                        lore.ore.readRDF(theurl);
                    }
                },
                prompt : true
            });
}
/**
 * Populate connection context menu with relationship types from the ontology.
 * Assumes that onturl has been set in init from preferences
 */
lore.ore.loadRelationshipsFromOntology = function() {
    lore.ore.ontrelationships = {};
    lore.ore.resource_metadata_props = ["rdf:type", "ore:isAggregatedBy"];
    if (lore.ore.onturl) {
        var xhr = new XMLHttpRequest();
        //xhr.overrideMimeType('text/xml');
        xhr.open("GET", lore.ore.onturl, true);
        xhr.onreadystatechange= function(){
            if (xhr.readyState == 4) {
                var db = jQuery.rdf.databank();
                for (ns in lore.constants.NAMESPACES){
                    db.prefix(ns,lore.constants.NAMESPACES[ns]);
                }
                db.load(xhr.responseXML);
                lore.ore.relOntology = jQuery.rdf({databank: db});
                lore.debug.ore("loading relationships from " + lore.ore.onturl,lore.ore.relOntology);      
                lore.ore.relOntology.where('?prop rdf:type <'+lore.constants.OWL_OBJPROP+'>')
                .each(function (){
                    var relresult = lore.global.util.splitTerm(this.prop.value.toString());
                    lore.ore.ontrelationships[relresult.term] = relresult.ns;
                });
                // TODO: load datatype properties for prop grids
            } 
        };
        xhr.send(null);
     }
     
        
}

/**
 * Delete the compound object from the repository
 */
lore.ore.deleteFromRepository = function(aURI, aTitle){
    var remid = aURI;
    var title = aTitle;
    if (!remid){
        remid = lore.ore.ui.grid.getSource()["rdf:about"];
        title = lore.ore.ui.grid.getSource()["dc:title"];
    }
    Ext.Msg.show({
        title : 'Remove Compound Object',
        buttons : Ext.MessageBox.OKCANCEL,
        msg : 'Are you sure you want to delete this compound object from the repository?<br><br>' + title + ' &lt;' + remid + "&gt;<br><br>This action cannot be undone.",
        fn : function(btn, theurl) {
            if (btn == 'ok') {
                try {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("DELETE",
                                  lore.ore.reposURL + "/statements?context=<"
                                        + remid + ">", true);  
                        xmlhttp.onreadystatechange= function(){
                            if (xmlhttp.readyState == 4) {
                                lore.ore.loadedRDF = {};
                                lore.ore.currentREM = "";
                                // TODO: delete from tree
                                lore.ore.createCompoundObject();
                                lore.ore.ui.loreInfo("Compound object deleted");
                            }
                        };
                        xmlhttp.send(null);
                } catch (e){
                    lore.debug.ore("deleting compound object",e);
                }
            }
        }
    });
}
/**
 * Save the compound object to the repository - prompt user to confirm
 */
lore.ore.saveRDFToRepository = function() {
    // TODO: implement Fedora support
    // TODO: compare new compound object with contents of rdfquery db that stores initial state - don't save if unchanged
    // update rdfquery to reflect most recent save
    var remid = lore.ore.ui.grid.getSource()["rdf:about"];
    Ext.Msg.show({
        title : 'Save RDF',
        buttons : Ext.MessageBox.OKCANCEL,
        msg : 'Save this compound object as ' + remid + "?",
        fn : function(btn, theurl) {
            if (btn == 'ok') {
                if (lore.ore.reposURL && lore.ore.reposType == 'sesame') {
                    var therdf = lore.ore.createRDF(false);
                    try {
                        /*(var xmlhttp = new XMLHttpRequest();
                        xmlhttp.open("DELETE",
                                  lore.ore.reposURL + "/statements?context=<"
                                        + remid + ">", true);
                        
                        xmlhttp.onreadystatechange= function(){
                            lore.debug.ore("ready state change from delete",xmlhttp);
                            if (xmlhttp.readyState == 4) {*/
                               var xmlhttp2 = new XMLHttpRequest();
                               xmlhttp2.open("PUT",
                                lore.ore.reposURL + "/statements?context=<"
                                        + remid + ">", true);
		                        xmlhttp2.onreadystatechange = function() {
                                    lore.debug.ore("ready state change from update",xmlhttp2);
		                            if (xmlhttp2.readyState == 4) {
		                                if (xmlhttp2.status == 204) {
                                            // TODO: add to tree
                                            lore.debug.ore("RDF saved",xmlhttp2);
		                                    lore.ore.ui.loreInfo(remid + " saved to "
		                                            + lore.ore.reposURL);
		                                } else {
		                                    lore.ore.ui.loreError('Unable to save to repository'
		                                                    + xmlhttp2.responseText);
		                                    Ext.Msg.show({
		                                        title : 'Problem saving RDF',
		                                        buttons : Ext.MessageBox.OKCANCEL,
		                                        msg : ('There was an problem saving to the repository: ' + xmlhttp2.responseText + '<br>Please try again or save your compound object to a file using the <i>Save to file</i> menu option and contact the Aus-e-Lit team for further assistance.')
		                                    });
		                                }
		                            }
		                        };
		                        xmlhttp2.setRequestHeader("Content-Type",
		                                "application/rdf+xml");
		                        xmlhttp2.send(therdf); 
                            //}
                        //}
                       // xmlhttp.send(null);
                       // lore.debug.ore("clearing" + remid);
                    } catch (e) {
                        xmlhttp = false;
                    }
                } else if (lore.ore.reposURL && lore.ore.reposType == 'fedora') {
                    lore.ore.ui.loreError("Saving to Fedora not yet implemented");
                    var soaptempl = "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                    + "<soap:Body> "
                            // + "<GetInfoByZIP xmlns=\"http://www.webserviceX.NET\"> <USZip>string</USZip> </GetInfoByZIP>"
                    + "</soap:Body></soap:Envelope>";
                }
            }
        }
    });
}
/**
 * Set the global variable storing the relationship ontology
 * 
 * @param {}
 *            relonturl The new locator for the ontology
 */
lore.ore.setrelonturl = function(relonturl) {
    lore.ore.onturl = relonturl;
    try{
        lore.ore.loadRelationshipsFromOntology();
    } catch (ex){
        lore.debug.ore("exception in setrelonturl", ex);
    }
}



lore.ore.handleLocationChange = function (contextURL) {
    
	lore.ore.ui.currentURL = contextURL;
	
	if ( !lore.ore.ui.lorevisible || ! lore.ore.ui.initialized)
		return;
	
	lore.ore.updateCompoundObjectsSourceList(contextURL);
	lore.ore.ui.loadedURL = contextURL;
    
}
/**
 * Helper function for updateSourceLists: updates the compound objects list with
 * objects that reference the contextURL
 * 
 * @param {}
 *            contextURL The escaped URL
 */
lore.ore.updateCompoundObjectsSourceList = function(contextURL) {
    lore.global.ui.clearTree(lore.ore.ui.remstreeroot);
	
    
    if (lore.ore.reposURL && lore.ore.reposType == 'sesame') {
        try {
            // query for matches of both www and non-www version of URL
           var escapedURL = encodeURIComponent(contextURL);
            var altURL = "";
	        if (!contextURL.match("http://www.")){
	            altURL = escape(contextURL.replace("http://","http://www."));
	        } else {
	            altURL = escape(contextURL.replace("http://www.","http://"));
	        }
            // TODO: Fedora support
            var queryURL = lore.ore.reposURL
	            + "?queryLn=sparql&query=" 
	            + "select distinct ?g ?a ?c ?t where { graph ?g {" 
                + "{<" + escapedURL + "> ?p ?o .} UNION " 
                + "{?s ?p2 <" + escapedURL + ">} UNION "
                + "{<" + altURL + "> ?p3 ?o2 .} UNION "
                + "{?s2 ?p4 <" + altURL + ">}"
                + "} . {?g <http://purl.org/dc/elements/1.1/creator> ?a}"
	            + ". {?g <http://purl.org/dc/terms/created> ?c}"
	            + ". OPTIONAL {?g <http://purl.org/dc/elements/1.1/title> ?t}}";
            var req = new XMLHttpRequest();
            req.open('GET', queryURL, true);
            req.onreadystatechange = function(aEvt) {
                if (req.readyState == 4) {
                    if (req.responseText && req.status != 204
                            && req.status < 400) {
                        
                        var xmldoc = req.responseXML;
                        var result = {};
                        if (xmldoc) {
                            lore.debug.ore("compound objects: sparql response", req);
                            result = xmldoc.getElementsByTagNameNS(
                                    lore.constants.NAMESPACES["sparql"], "result");
                        }
                        for (var i = 0; i < result.length; i++) {
                            var theobj = new lore.ore.CompObjListing(result[i]);
                            if (!lore.ore.ui.remstreeroot.findChild('id',theobj.uri)){
                               //lore.debug.ore("processing compound object", theobj);
                               var tmpNode = new Ext.tree.TreeNode({
                                        'text' : theobj.title,
                                        'id' : theobj.uri,
                                        'uri' : theobj.uri,
                                        'qtip': "Created by " + theobj.creator + ", " + theobj.created,
                                        'iconCls' : 'oreresult',
                                        'leaf' : true,
                                        'draggable': true
                                });
                               lore.ore.ui.remstreeroot.appendChild(tmpNode);
                               lore.ore.attachREMEvents(tmpNode);
                            }

                        }
                        if (!lore.ore.ui.remstreeroot.isExpanded()) {
                            lore.ore.ui.remstreeroot.expand();
                        }
                        if(lore.ore.ui.remstreeroot.hasChildNodes()){
                            lore.ore.ui.propertytabs.activate("sourcestree");
                        }
                    } else if (req.status = 404){
                        lore.debug.ore("404 accessing compound object repository",req);
                    }
                }
            };
            req.send(null);
        } catch (e) {
            lore.debug.ore("Unable to retrieve compound objects",e);
            lore.ore.ui.loreWarning("Unable to retrieve compound objects");
        }
    }
}
/* Graph related functions */
/**
 * Updates global variables used for figure layout
 */
lore.ore.graph.nextXY = function() {
    // TODO: Need a real graph layout algorithm
    if (lore.ore.graph.dummylayoutx > lore.ore.MAX_X) {
        lore.ore.graph.dummylayoutx = 50;
        lore.ore.graph.dummylayouty += lore.ore.NODE_HEIGHT
                + lore.ore.NODE_SPACING;
    } else {
        lore.ore.graph.dummylayoutx += lore.ore.NODE_WIDTH
                + lore.ore.NODE_SPACING;
    }
}
/**
 * Get the figure that represents a resource
 * 
 * @param {}
 *            theURL The URL of the resource to be represented by the node
 * @return {} The figure representing the resource
 */
lore.ore.graph.lookupFigure = function(theURL) {
    var figid = lore.ore.graph.lookup[theURL];
    return lore.ore.graph.Graph.getDocument().getFigure(figid);
}
/**
 * Add a node figure with layout options
 * @param {} theURL
 * @param {} opts The layout options
 * @return {}
 */
lore.ore.graph.addFigureWithOpts = function(opts){
    var fig = null;
    var theURL = opts.url;
    if (theURL && lore.ore.graph.lookup[theURL] == null) {
        fig = new lore.ore.graph.ResourceFigure();
        fig.setTitle("Resource");
        if (opts.w && opts.h){
            fig.setDimension(opts.w, opts.h);    
        } else {
            fig.setDimension(220, 170);
        }
        if (opts.oh) {
           fig.originalHeight = opts.oh;
        }
        if (opts.sx && opts.sy) {
            fig.scrollx = parseInt(opts.sx);
            fig.scrolly = parseInt(opts.sy);
        }
        if (opts.format){
            fig.metadataproperties["dc:format"] = opts.format;
        }
        fig.setContent(theURL);
        lore.ore.graph.Graph.addFigure(fig, opts.x, opts.y);
        lore.ore.graph.lookup[theURL] = fig.getId();
      	  lore.ore.ui.oreviews.activate("drawingarea");
    } else {
        lore.ore.ui.loreWarning("Resource is already in the compound object: " + theURL);
    }
    return fig;
}

/**
 * Add a node figure to the graphical view to represent a resource
 * 
 * @param {}
 *            theURL The URL of the resource to be represented by the node
 */
lore.ore.graph.addFigure = function(theURL) {
	var fig = lore.ore.graph.addFigureWithOpts({
        "url": theURL, 
        "x": lore.ore.graph.dummylayoutx,
        "y": lore.ore.graph.dummylayouty
    });
    if (fig != null) {
        lore.ore.graph.nextXY();
    }
    return fig;
}
/** Transform RDF/XML of the current compound object using XSLT 
 * @param {String} stylesheetURL The XSLT stylesheet (probably a chrome URI)
 * @param {object} params Any parameters to pass to the XSLT stylesheet
 * @param {boolean} serialize True to return the result as a String rather than a Fragment
 * @return {object} String or Fragment containing result of applying the XSLT
 */
lore.ore.transformORERDF = function(stylesheetURL, params, serialize){
	 return lore.global.util.transformRDF(stylesheetURL, lore.ore.createRDF(false), params, window, serialize)
}
/**
 * Use XSLT to generate a smil file from the compound object, plus create an
 * HTML wrapper
 * 
 * @return {} The file name of the wrapper file
 */
lore.ore.createSMIL = function() {
    try {
       
        var result = lore.ore.transformORERDF("chrome://lore/content/compound_objects/stylesheets/smil_view.xsl",{},true);
		 
		
		var file = lore.global.util.getFile(lore.ore.ui.extension.path);
		file.append("content");
		file.append("oresmil.smil");
		
        lore.global.util.writeFile(result, file,window);
        var htmlwrapper = "<HTML><HEAD><TITLE>SMIL Slideshow</TITLE></HEAD>"
                + "<BODY BGCOLOR=\"#003366\"><CENTER>"
                + "<embed style='border:none' height=\"95%\" width=\"95%\" src=\"oresmil.smil\" type=\"application/x-ambulant-smil\"/>"
                + "</CENTER><p style='font-size:smalller;color:#ffffff; padding:5px'>SMIL presentation generated by LORE on "
                + "<script type='text/javascript'>document.write(new Date().toString())</script>"
                + "</p></BODY></HTML>";
        
		file = lore.global.util.getFile(lore.ore.ui.extension.path);
		file.append("content");
		file.append("playsmil.html");
		return lore.global.util.writeFile(htmlwrapper, file,window);

    } catch (e) {
        lore.ore.ui.loreWarning("Unable to generate SMIL: " + e.toString());
    }
}
/** Generate FOXML from the current compound object */
lore.ore.createFOXML = function (){
    try {
        var params = {'coid': 'demo:' + lore.global.util.splitTerm(lore.ore.ui.grid.getSource()['rdf:about']).term};
        return lore.ore.transformORERDF("chrome://lore/content/compound_objects/stylesheets/foxml.xsl",params,true);     
    } catch (e) {
        lore.ore.ui.loreWarning("Unable to generate FOXML");
        lore.debug.ore("Unable to generate FOXML: ",e);
        return null;
    }
}
/** Generate a Word document from the current compound object */
lore.ore.createOREWord = function (){
    try {
        return lore.ore.transformORERDF("chrome://lore/content/compound_objects/stylesheets/wordml.xsl",{},true);
    } catch (e) {
        lore.ore.ui.loreWarning("Unable to generate Word document");
        lore.debug.ore("Unable to generate Word document",e);
        return null;
    }
}

/** update the metadataproperties recorded in the figure for that node */
// TODO: this needs to update the model (and view needs to listen to model)
lore.ore.handleNodePropertyChange = function(source, recid, newval, oldval) {
    lore.ore.graph.modified = true;
    var theval;
    lore.debug.ore("handle property change " + recid + " " + newval + " " + oldval,source);
    if (recid == 'resource') {
        // the URL of the resource has changed
        if (newval && newval != '') {
            theval = newval;
        } else {
            theval = "about:blank";
        }
        if (lore.ore.graph.lookup[theval]) {
            lore.ore.ui.loreWarning("Cannot change resource URL: a node already exists for " + theval);
            lore.ore.graph.selectedFigure.setContent("about:blank");
        } else {
            lore.ore.graph.lookup[theval] = lore.ore.graph.selectedFigure.getId();
        }
        delete lore.ore.graph.lookup[oldval];
    } else if (recid == 'dc:title') {
        // update figure title
        lore.ore.graph.selectedFigure.setTitle(newval);
    } else if (recid == 'relationship'){
        try{
        lore.ore.graph.selectedFigure.setRelationshipType(source["namespace"],newval);
        } catch (e){
            lore.debug.ore("updating rel",e);
        }
    }
    else {
        lore.ore.graph.selectedFigure.updateMetadata(source);
    }
}
lore.ore.graph.dummyBatchDialog = function(){
    // dummy dialog for OR09 challenge

    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
    .getService(Components.interfaces.nsIWindowMediator);
    var mainWindow = wm.getMostRecentWindow("navigator:browser");
        var thebrowser = mainWindow.getBrowser();
    var num = thebrowser.browsers.length;
    var thehtml = "<div style='border:1px solid black; padding:10px; margin:10px;background-color:white'>";
    for (var i = 0; i < num; i++) {
        var b = thebrowser.getBrowserAtIndex(i);
        try {
        //alert(b.currentURI.spec); // dump URLs of all open tabs to console
        thehtml += "<input type='checkbox' checked='checked'> " + b.currentURI.spec + "<br/>";
        } catch(e) {
        Components.utils.reportError(e);
        }
    }
    thehtml += "</div>";
    
    var win = new Ext.Window({
                //applyTo     : 'hello-win',
                layout      : 'fit',
                width       : 500,
                height      : 300,
                closeAction :'hide',
                plain       : true,
        
        html: "<p>Create a compound object using the following content:</p>" + 
        thehtml + 
        "<input type='checkbox' checked='checked'> Create relationships from browser history<br/>" +
        "<input type='checkbox' checked='checked'> Tag automatically using text-mining service<br/>",
                buttons: [{
            text     : 'OK',
            handler: function(){
                win.hide();
            }
            },{
            text     : 'Cancel',
            handler  : function(){
                win.hide();
            }
            }]
            });
    
    win.show();

    }

