/** 
 * @class lore.ore.ui.PropertyEditor Grid-based editor for Compound object or resource properties and relationships
 * @extends Ext.grid.EditorGridPanel
 */
lore.ore.ui.PropertyEditor = Ext.extend(Ext.grid.EditorGridPanel,{ 
    initComponent: function(config){
        Ext.apply(this, { 
            clicksToEdit : 1,
            columnLines : true,
            autoHeight : true,
            autoWidth: true,
            collapsible : true,
            collapseFirst: false,
            animCollapse : false,
            /** Pop up editor for property value */
            propEditorWindow: new Ext.Window({ 
            	propEditor: this,
                modal: true,
                closable: false,
                layout: 'fit',
                animateTarget: 'properties',
                focus: function() {
                    this.getComponent(0).focus();
                },
                editField: function(tfield,rownum){
                    try {
                        lore.debug.ore("editField",[tfield,rownum]);
                        this.triggerField = tfield;
                        this.activeRow = rownum;
                        var val = tfield.getValue();
                        this.getComponent(0).setValue(val? val : '');
                        this.show(); 
                        this.focus();
                    } catch (e){
                        lore.debug.ore("problem in editField",e);
                    }
                },
                onShow: function(){
                	var rec = this.propEditor.store.getAt(this.activeRow);       	
                	var ccbuttons = this.getBottomToolbar().getComponent(0);
                	if (rec.data.name == "dc:rights"){
                		ccbuttons.show();
                	} else {		         		
                		ccbuttons.hide();        		
                	}
                	Ext.Window.prototype.onShow.call(this);
                },
                items: [
                    {
                        xtype: 'textarea',
                        validateOnBlur: false,
                        width: 400,
                        grow: false,
                        height: 150
                    }
                ],
                bbar: [
                    {
                    	xtype: 'buttongroup',           	
                    	columns: 3,
                    	items: [
		                    {
		                    	xtype: 'button',                 	
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/by.png',
		                    	tooltip: 'Set to Creative Commons Attribution licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by/3.0/au/");
		                    	}
		                    },
		                    {
		                    	xtype: 'button',
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/bysa.png',
		                    	tooltip: 'Set to Creative Commons Attribution Share Alike licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by-sa/3.0/au/");
		                    	}
		                    },
		                    {
		                    	xtype: 'button',
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/bync.png',
		                    	tooltip: 'Set to Creative Commons Attribution Noncommercial licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by-nc/3.0/au/");
		                    	}   	
		                    },
		                    {
		                    	xtype: 'button',
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/bynd.png',
		                    	tooltip: 'Set to Creative Commons Attribution No Derivative Works licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by-nd/3.0/au/");
		                    	}
		                    },
		                    {
		                    	xtype: 'button',
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/byncsa.png',
		                    	tooltip: 'Set to Creative Commons Attribution Noncommercial Share Alike licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by-nc-sa/3.0/au/");
		                    	}
		                    },
		                    {
		                    	xtype: 'button',                    	
		                    	text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		                    	icon: 'chrome://lore/skin/icons/cc/byncnd.png',
		                    	tooltip: 'Set to Creative Commons Attribution Noncommercial No Derivatives licence',
		                    	scope: this,
		                    	handler: function(){
		                    		this.propEditorWindow.getComponent(0)
		                    			.setValue("http://creativecommons.org/licenses/by-nc-nd/3.0/au/");
		                    	}
		                    }
		                ]
                    },
                    '->',
                    {
                        xtype: 'button',
                        tooltip: 'Update the property value and close editor',
                        text: 'Update',
                        scope: this, // the properties panel
                        handler: function(btn, ev){
                            try{
                                var w = this.propEditorWindow;
                                var ta = w.getComponent(0);
                                // need to start/stop editing to trigger handlePropertyChange to update model
                                this.startEditing(w.activeRow,1);
                                w.triggerField.setValue(ta.getRawValue());
                                this.stopEditing();
                                w.hide();
                            } catch (e){
                                lore.debug.ore("problem in update",e);
                            }
                        }
                    },
                    {
                        xtype: 'button', 
                        tooltip: 'Cancel edits and close editor',
                        text: 'Cancel',
                        scope: this, // the properties panel
                        handler: function(btn, ev){
                            try{
                                var w = this.propEditorWindow;
                                w.hide();
                            } catch (e){
                                lore.debug.ore("problem in cancel",e);
                            }
                        }
                    }
                ]
            }),
            store : new Ext.data.JsonStore({
                idProperty : 'id',
                fields : [
                    {
                        name : 'id',
                        type : 'string'
                    }, {
                        name : 'name',
                        type : 'string'
                    }, {
                        name : 'value',
                        type : 'auto'
                    }
                ]
            }),
            colModel : new Ext.grid.ColumnModel({
                columns : [{
                            header : 'Property Name',
                            sortable : true,
                            dataIndex : 'name',
                            menuDisabled : true,
                            width: 70
                 }, {
                            header : 'Value',
                            dataIndex : 'value',
                            menuDisabled : true,
                            
                           editor: new Ext.form.TriggerField({
                                 propertyEditor: this,
                                 triggerClass: 'x-form-ellipsis-trigger',
                                 triggerConfig: {
                                    tag : "img", 
                                    src : Ext.BLANK_IMAGE_URL,
                                    cls: "x-form-trigger x-form-ellipsis-trigger",
                                    qtip: 'Edit this value in a pop up window'
                                 },
                                 onTriggerClick: function(ev) {
                                    try{ 
                                     var row = this.propertyEditor.lastEdit.row;
                                     this.propertyEditor.stopEditing();
                                     this.propertyEditor.propEditorWindow.editField(this,row);
                                    } catch (e){
                                        lore.debug.ore("problem in trigger click",e);
                                    }
                                 } 
                           })
                        }

                ]
            }),
            sm : new Ext.grid.RowSelectionModel({
                        singleSelect : true
            }),
            viewConfig : {
                forceFit : true,
                deferEmptyText: false,
                emptyText: "No resource selected"
            },
            tools : [{
                        id : 'plus',
                        qtip : 'Add a property',
                        handler : this.addPropertyAction
                    }, {
                        id : 'minus',
                        qtip : 'Remove the selected property',
                        handler : this.removePropertyAction
                    }, {
                        id : 'help',
                        qtip : 'Display information about the selected property',
                        handler : this.helpPropertyAction
                    }
            ]
                        
        });
        lore.ore.ui.PropertyEditor.superclass.initComponent.call(this,config);
        
        // hide/show the properties when the collapse/expand button in the toolbar is triggered
        // FIXME: collapse/expand getting out of sync when CO is loaded
        this.on('beforecollapse', function(p){p.body.setStyle('display','none');});
        this.on('beforeexpand', function(p){p.body.setStyle('display','block');});

        // Set up listeners
        this.on("afteredit", this.handlePropertyChange,this);
        this.store.on("remove", this.handlePropertyRemove,this);
        
        this.propEditorWindow.on("show", function(){
            // force redraw of text area of popup editor on scroll to get around FF iframe bug see #209
            var taEl = this.getComponent(0).getEl();
            taEl.on("scroll",function(e,t,o){this.repaint();},taEl);
        }, this.propEditorWindow, {single:true});
        
        // TODO: use MVC, store read only status of properties in model rather than hardcoding this?
        if (this.id == "nodegrid"){
            this.on("beforeedit", function(e) {
                    // don't allow generated format or type field to be edited
                    if (e.record.id == "dc:format_0" || e.record.id == "rdf:type_0") {
                        e.cancel = true;
                    }
                    
            });
        } else {
            this.on("beforeedit", function(e) {
                // don't allow these fields to be edited
                if (e.record.id == "dcterms:modified_0"
                        || e.record.id == "dcterms:created_0"
                        || e.record.id == "rdf:about_0") {
                    e.cancel = true;
                }
            });
           
            this.on("afteredit", function(e) {
                try{
                    
                
                 // update the CO title in the dataview
                   
                  if (e.record.id == "dc:title_0") {
                    lore.ore.coListManager.updateCompoundObject(
                        lore.ore.cache.getLoadedCompoundObjectUri(),
                        {title: e.value}
                    );
                  }
                // commit the change to the datastore
                this.store.commitChanges();
                } catch (e){
                    lore.debug.ore("problem",e);
                }
            });
        }
    },
    makeAddPropertyMenu: function (mp){
    	var panel = this;
    	panel.propMenu = new Ext.menu.Menu({
            id: panel.id + "-add-metadata"
        });
        panel.propMenu.panelref = panel.id;
        for (var i = 0; i < mp.length; i++) {
            var propname = mp[i];
            panel.propMenu.add({
                id: panel.id + "-add-" + propname,
                text: propname,
                handler: function () {
                    try{
                        var panel = Ext.getCmp(this.parentMenu.panelref);
                        var pstore = panel.getStore();
                        var counter = 0;
                        var prop = pstore.getById(this.text + "_" + counter);
                        while (prop) {
                            counter = counter + 1;
                            prop = pstore.getById(this.text + "_" + counter);
                        }
                        var theid = this.text + "_" + counter;
                        pstore.loadData([{id: theid, name: this.text, value: ""}],true);
                        
                    } catch (ex){
                        lore.debug.ore("exception adding prop " + this.text,ex);
                    }
                }
            });
        }
    },
    /** Handler for plus tool button on property grids 
     * 
     * @param {} ev
     * @param {} toolEl
     * @param {} panel
     */
    addPropertyAction : function (ev, toolEl, panel) {
    	try{
        if (!panel.propMenu || !panel.loadedOntology || (lore.ore.ontologyManager.ontologyURL != panel.loadedOntology)) {        	
        	panel.loadedOntology = lore.ore.ontologyManager.ontologyURL;
        	panel.makeAddPropertyMenu(lore.ore.ontologyManager.getDataTypeProperties());
        }
        if (panel.id == "remgrid" || lore.ore.ui.graphicalEditor.getSelectedFigure() instanceof lore.ore.ui.graph.ResourceFigure){
            if (panel.collapsed) {
                panel.expand(false);
            }
            panel.propMenu.showAt(ev.xy);
        } else {
            lore.ore.ui.vp.info("Please click on a Resource node before adding property");
        }
    	} catch (e){
    		lore.debug.ore("Problem in addPropertyAction",e);
    	}
    },
    /** Handler for minus tool button on property grids
     * 
     * @param {} ev
     * @param {} toolEl
     * @param {} panel
     */
    removePropertyAction: function (ev, toolEl, panel) { 
        try {
        var om = lore.ore.ontologyManager;
        lore.debug.ore("remove Property was triggered",ev);
        var sel = panel.getSelectionModel().getSelected();
        // don't allow delete when panel is collapsed (user can't see what is selected)
        if (panel.collapsed) {
            lore.ore.ui.vp.info("Please expand the properties panel and select the property to remove");
        } else if (sel) {
            // TODO: #2 (refactor): should allow first to be deleted as long as another exists
            // should also probably renumber
                 if (sel.id.match("_0")){ // first instance of property: check if it's mandatory
                    var propId = sel.id.substring(0,sel.id.indexOf("_0"));
                    if ((panel.id == "remgrid" && om.CO_REQUIRED.indexOf(propId)!=-1) ||
                        (panel.id == "nodegrid" && 
                            (om.RES_REQUIRED.indexOf(propId) !=-1 ||
                                om.REL_REQUIRED.indexOf(propId)!=-1))){
                        lore.ore.ui.vp.warning("Cannot remove mandatory property: " + sel.data.name);
                    } else {
                        panel.getStore().remove(sel);
                    }
                } else { // not the first instance of the property: always ok to delete
                    panel.getStore().remove(sel);
                }
         } else {
            lore.ore.ui.vp.info("Please click on the property to remove prior to selecting the remove button");
         }
        } catch (ex) {
            lore.debug.ore("error removing property ",ex);
        }
    },
    /** Handler for help tool button on property grids
     * 
     * @param {} ev
     * @param {} toolEl
     * @param {} panel
     */
    helpPropertyAction : function (ev,toolEl, panel) {
        var sel = panel.getSelectionModel().getSelected();
        if (panel.collapsed){
            lore.ore.ui.vp.info("Please expand the panel and select a property");
        } else if (sel){
            var splitprop =  sel.data.name.split(":");
            var infoMsg = "<p style='font-weight:bold;font-size:130%'>" + sel.data.name + "</p><p style='font-size:110%;margin:5px;'>" 
            + sel.data.value + "</p>";
            if (splitprop.length > 1){
                var ns = lore.constants.NAMESPACES[splitprop[0]];
                infoMsg += "<p>This property is defined in " 
                        + "<a style='text-decoration:underline' href='#' onclick='lore.global.util.launchTab(\"" 
                        + ns + "\");'>" + ns + "</a></p>";
            }
            
            Ext.Msg.show({
                    title : 'About ' + sel.data.name,
                    buttons : Ext.MessageBox.OK,
                    msg : infoMsg
                });
        } else {
            lore.ore.ui.vp.info("Please click on a property prior to selecting the help button");
        }
    },
    // TODO: use MVC
    handlePropertyRemove : function(store, record, index){
        if (this.id == "nodegrid"){            
            lore.ore.ui.graphicalEditor.getSelectedFigure().unsetProperty(record.id);
        }
        lore.ore.ui.graphicalEditor.isDirty = true;
    },
    /** update the metadataproperties recorded in the figure for that node */
    handlePropertyChange : function(args) {
    	lore.ore.ui.graphicalEditor.isDirty = true;
        // TODO: MVC: this needs to update the model (and view needs to listen to model)
        // at present this only updates resource/rel properties - also needs to update on compound object
        try{
            if (this.id == "nodegrid"){
                var theval;
                var selfig = lore.ore.ui.graphicalEditor.getSelectedFigure();
                lore.debug.ore("handle property change " + args.record.id + "  to " + args.value + " " + args.originalValue,args);
                if (selfig instanceof lore.ore.ui.graph.ContextmenuConnection){
                    if (args.record.data.name == 'relationship'){ 
                        selfig.setRelationship(
                            this.getPropertyValue("namespace"),args.value);
                    }
                } else { // Resource property
                    if (args.record.data.name == 'resource') {
                        // the URL of the resource has changed
                        if (args.value && args.value != '') {
                            theval = args.value;
                        } else {
                            theval = "about:blank";
                        }
                        if (lore.ore.ui.graphicalEditor.lookup[theval]) {
                            lore.ore.ui.vp.warning("Cannot change resource URL: a node already exists for " + theval);
                            return;
                        } else {
                           lore.ore.ui.graphicalEditor.lookup[theval] = selfig.getId();
                           delete lore.ore.ui.graphicalEditor.lookup[args.originalValue];
                        }
                        if (lore.ore.ui.topView){
                            if (lore.ore.controller.currentURL == theval){
                               lore.ore.ui.topView.hideAddIcon(true);
                            } else if (lore.ore.controller.currentURL == args.originalValue){
                               lore.ore.ui.topView.hideAddIcon(false);
                            }
                        }
                    }
                    selfig.setProperty(args.record.id,args.value);
                }
                lore.ore.ui.nodegrid.store.commitChanges();
            }
        } catch (e){
            lore.debug.ore("error handling node property change",e);
        }
    },
    /** Looks up property value from a grid by name
     * 
     * @param {} propname The name of the property to find
     * @return Object The value of the property
     */
    getPropertyValue : function(propname){
        var proprecidx = this.store.find("name",propname);
        if (proprecidx != -1){
           return this.store.getAt(proprecidx).get("value");
        } else {
            return "";
        }
    }
});
/* Old code:
lore.ore.handleNodePropertyAdd = function(store, records, index){
    lore.debug.ore("added property " + record.id,record);
    // user should only be editing a single record at a time
    // TODO: handle case where node has one record and is selected (triggering add record for existing value)
    if (records.length == 1){
        lore.ore.ui.graphicalEditor.getSelectedFigure().setProperty(records[0].id,records[0].data.value);
    }
};
*/
Ext.reg('propertyeditor',lore.ore.ui.PropertyEditor);