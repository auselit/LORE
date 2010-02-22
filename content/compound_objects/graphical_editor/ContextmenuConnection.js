/*
 * Copyright (C) 2008 - 2010 School of Information Technology and Electrical
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
/**
 * Connection figure that provides a context menu to set the connection type
 * The types are sourced from ontrelationships, which is populated from an ontology (see uifunctions.js)
 * @class lore.ore.graph.ContextmenuConnection
 * @extends draw2d.Connection
 */
lore.ore.graph.ContextmenuConnection=function(){
	draw2d.Connection.call(this);
	this.lineColor = new draw2d.Color(174,174,174); // light grey
	this.labelColor = new draw2d.Color(51,51,51); // dark grey
    this.label = new draw2d.Label();
    this.label.setColor(this.labelColor);
    this.addFigure(this.label, new draw2d.ManhattanMidpointLocator(this));
	this.setRouter(new draw2d.BezierConnectionRouter());
    this.setRelationshipType("http://purl.org/dc/elements/1.1/","relation",false);
	this.sourcePort=null;
    this.targetPort=null;
	this.lineSegments=[];
	this.setColor(this.lineColor);
	this.setLineWidth(1);
    var tgtArrow = new draw2d.ArrowConnectionDecorator();
    tgtArrow.setColor(this.lineColor);
    this.setTargetDecorator(tgtArrow); 
	this.setSourceAnchor(new draw2d.ChopboxConnectionAnchor());
	this.setTargetAnchor(new draw2d.ChopboxConnectionAnchor());
};

lore.ore.graph.ContextmenuConnection.prototype=new draw2d.Connection;
/**
 * Update the type of relationship that the connection represents
 * @param {} enamespace
 * @param {} etype
 * @param {} symmetric
 */
lore.ore.graph.ContextmenuConnection.prototype.setRelationshipType=function(enamespace, etype, symmetric){
	this.edgetype=etype;
	this.edgens=enamespace;
	this.label.setText(etype);
    try{
    if (symmetric){
        var theArrow = new draw2d.ArrowConnectionDecorator();
        theArrow.setColor(this.lineColor);
        this.setSourceDecorator(theArrow);
    } else {
        this.setSourceDecorator(null);
    }
    } catch(ex) {
        lore.debug.ore("Exception setting connection rel type",ex);
    }
};
/**
 * Construct the context menu for selecting the connection type
 * @return {}
 */
lore.ore.graph.ContextmenuConnection.prototype.getContextMenu=function() {
    try {
    // use the cached menu if the relationship ontology has not changed
    if (lore.ore.graph.ContextmenuConnection.contextMenu && (
            lore.ore.graph.ContextmenuConnection.loadedOntology == lore.ore.onturl)) {
        return lore.ore.graph.ContextmenuConnection.contextMenu;
    } else {
        lore.debug.ore("generating context menu for connection",this);
	    lore.ore.graph.ContextmenuConnection.contextMenu=new draw2d.Menu();
		// sort the menu entries alphabetically
		var keys = [];
	 	for (var rel in lore.ore.ontrelationships){
			keys.push(rel);
	 	}
	 	keys.sort();
	 	for (var i =0; i< keys.length; i++){
	 		rel = keys[i];
			var relnamespace=lore.ore.ontrelationships[rel]; 
            var symmquery = lore.ore.relOntology.prefix('rdf',lore.constants.NAMESPACES["rdf"])
                .where('<' + relnamespace + rel +'> rdf:type <' + lore.constants.OWL_SPROP + '>');
	        var symm = symmquery.length > 0;
			var functionstr = "lore.ore.graph.selectedFigure.setRelationshipType(\"" + relnamespace + "\", \"" +  rel + "\"," + symm + ");";
	 		lore.ore.graph.ContextmenuConnection.contextMenu.appendMenuItem(new draw2d.MenuItem(rel,null,new Function(functionstr)));
	 	}
        lore.ore.graph.ContextmenuConnection.loadedOntology = lore.ore.onturl;
		return lore.ore.graph.ContextmenuConnection.contextMenu;
    }
    } catch (ex){
        lore.debug.ore("problem generating context menu for connection",ex);
        return null;
    }
};


