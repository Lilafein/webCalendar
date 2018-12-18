/*!
 * Extensible 1.6.1
 * Copyright(c) Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */

Ext.onReady(function(){
	Ext.Loader.setConfig({
	    enabled: true,
	    disableCaching: false,
	    paths: {
	        "Extensible": "../../src",
	        "Extensible.example": "..",
			"Org.Silv": ""
	    }
	});
	Ext.require([
	    'Extensible.calendar.data.MemoryEventStore',
	    'Extensible.calendar.CalendarPanel',
	    'Extensible.example.calendar.data.Events',
		'Org.Silv.form.MeetingEventWindow'
	]);
	Extensible.calendar.data.EventMappings.PersonName = {
	    name: 'personName',
	    mapping: 'personName'
	};
	Extensible.calendar.data.EventMappings.Title.mapping = 'title';
	Extensible.calendar.data.EventMappings.Title.name = 'title';
	Extensible.calendar.data.EventMappings.Notes.mapping = 'description';
	Extensible.calendar.data.EventMappings.Notes.name = 'description';
	Extensible.calendar.data.EventMappings.StartDate.mapping = 'startDate';
	Extensible.calendar.data.EventMappings.StartDate.name = 'startDate';
	Extensible.calendar.data.EventMappings.EndDate.mapping = 'endDate';
	Extensible.calendar.data.EventMappings.EndDate.name = 'endDate';
	//Extensible.calendar.data.EventMappings.EventId.mapping = 'id'////;
	//Extensible.calendar.data.EventMappings.EventId.name = 'id';

	Extensible.calendar.data.EventModel.reconfigure();
	 


	Ext.override(Extensible.calendar.view.Month, {

		isEventVisible: function(evt) {
			if(evt[Extensible.calendar.data.EventMappings.StartDate.name] == null) return false;
			
			  var eventMappings = Extensible.calendar.data.EventMappings,
	            calendarMappings = Extensible.calendar.data.CalendarMappings,
	            data = evt.data || evt,
	            calRec = this.calendarStore ? this.calendarStore.findRecord(calendarMappings.CalendarId.name,
	                evt[eventMappings.CalendarId.name]) : null;
					
			
			
	        if (calRec && calRec.data[calendarMappings.IsHidden.name] === true) {
	            return false;
	        }

	        var start = this.viewStart.getTime(),
	            end = this.viewEnd.getTime(),
	            evStart = data[eventMappings.StartDate.name].getTime(),
	            evEnd = data[eventMappings.EndDate.name].getTime(),
	            isOverlapping = Extensible.Date.rangesOverlap(start, end, evStart, evEnd);

	        return isOverlapping;
	      
	    }
	});

	Ext.override(Extensible.calendar.form.EventWindow, {
		
		titleTextAdd: 'Добавить встречу',
		titleTextEdit: 'Изменить встречу',
		datesLabelText: 'Когда',
		saveButtonText: 'Сохранить',
		deleteButtonText: 'Удалить',
	    cancelButtonText: 'Отменить',
		calendarStore: false,
		titleLabelText: 'Название',
		getFormItemConfigs: function() { 
			 var items = this.callOverridden();
			 items.push({
	             xtype: 'textfield',
	             itemId: this.id + '-name',
	             name: Extensible.calendar.data.EventMappings.PersonName.name,
	             anchor: '100%',
	             fieldLabel: "Ф.И.О.",
	             store: this.calendarStore
	         },{
	                xtype: 'textarea',
	                itemId: this.id + '-descript',
	                name: Extensible.calendar.data.EventMappings.Notes.name,
	                anchor: '100%',
	                fieldLabel: "Описание",
					grow: true,
					growMax: 150,
	                store: this.calendarStore
	            }
				);
			return items;
		},
		modal: true,
		enableEditDetails: false,
		getFooterBarConfig: function(){
			 var cfg = ['->', {
	                text: this.saveButtonText,
	                itemId: this.id + '-save-btn',
	                disabled: false,
	                handler: this.onSave,
	                scope: this
	            },{
	                text: this.deleteButtonText,
	                itemId: this.id + '-delete-btn',
	                disabled: false,
	                handler: this.onDelete,
	                scope: this,
	                hideMode: 'offsets' // IE requires this
	            },{
	                text: this.cancelButtonText,
	                itemId: this.id + '-cancel-btn',
	                disabled: false,
	                handler: this.onCancel,
	                scope: this
	            }];
				return cfg;
		}
	});

	var eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
        autoLoad: true,
	    autoSync: true,
		model: 'Extensible.calendar.data.EventModel',
	    proxy: {
	        type: 'rest',
	        api: {
	            read: '/meeting_get',
	            create: '/meeting_create',
	            update: '/meeting_update',
	            destroy: '/meeting_delete'
	        },
			 headers: {
	            'Content-Type': 'application/json'
	        },
	        reader: {
	            type: 'json',
				root: '',
	            successProperty: 'success',
	            messageProperty: 'message'
	        },
	        writer: {
	            type: 'json'
	            //writeAllFields: true
	        },
	        listeners: {
	            exception: function(proxy, response, operation){
	                Ext.MessageBox.show({
	                    title: 'REMOTE EXCEPTION',
	                    msg: operation.getError(),
	                    icon: Ext.MessageBox.ERROR,
	                    buttons: Ext.Msg.OK
	                });
	            }
	        }
	    },
	    listeners: {
	        write: function(proxy, operation){
	            if (operation.action == 'destroy') {
	                main.child('#form').setActiveRecord(null);
	            }
	           // Ext.example.msg(operation.action, operation.resultSet.message);
	        }
	    }
	});

	
	var editorWin = Ext.create('Org.Silv.form.MeetingEventWindow', {
        id: 'ext-data-editwin',
        modal: true,
        listeners: {
                    'eventadd': {
                        fn: function(win, rec, animTarget, options) {
                            //win.hide(animTarget);
                           //  win.currentView.onEventEditorAdd(null, rec, options);
							eventStore.add(rec);
							//eventStore.sync();
							//editorWin.onCancel();
							editorWin.hide();
                        },
                        scope: this
                    },
                    'eventupdate': {
                        fn: function(win, rec, animTarget, options) {
                            //win.hide(animTarget);
                           // win.currentView.onEventEditorUpdate(null, rec, options);
                        	editorWin.hide();
                        },
                        scope: this
                    },
                    'eventdelete': {
                        fn: function(win, rec, animTarget, options) {
                        	//eventStore.remove(rec);
                            //win.hide(animTarget);
                            //win.currentView.onEventEditorDelete(null, rec, options);
                        },
                        scope: this
                    },
                    'editdetails': {
                        fn: function(win, rec, animTarget, view) {
                            // explicitly do not animate the hide when switching to detail
                            // view as it looks weird visually
                            win.animateTarget = null;
                            win.hide();
                            win.currentView.fireEvent('editdetails', win.currentView, rec);
                        },
                        scope: this
                    },
                    'eventcancel': {
                        fn: function(win, rec, animTarget) {
                            //this.dismissEventEditor(null, animTarget);
                            //win.currentView.onEventEditorCancel();
							editorWin.hide()
                        },
                        scope: this
                    }
                }
	});
	formPanel = Ext.create('Extensible.calendar.CalendarPanel', {
        eventStore: eventStore,
        id:'app-calendar',
        renderTo: 'simple',
        title: 'Silv meeting Calendar',
        width: 700,
        height: 500,
		monthText : 'Month',
		showDayView: false,
		showWeekView: false,
		showMultiWeekView: false
		
    });
   var createButton = Ext.create('Ext.Button', {
		text: 'Создать',
		margin: 5,
		renderTo: 'panel',
		listeners: {
			click: function() {
				editorWin.show(new Extensible.calendar.data.EventModel());
				//this.setText('I was clicked!');
				}
			}
		});
		
	var deleteButton = Ext.create('Ext.Button', {
		text: 'Удалить',
		margin: 5,
		renderTo: 'panel',
		listeners: {
			click: function() {
				//rec = table.getView();
				var rec = table.getSelectionModel().getSelection()[0];
				eventStore.remove(rec);
				formPanel.getActiveView().refresh(true);
				//eventStore.sync();
				//this.setText('I was clicked!');
				}
			}
	});
	
	var table = Ext.create('Ext.grid.Panel', {
			store: eventStore,
			renderTo: 'panel',
			columns: [
				{header: 'Название встречи',  dataIndex: Extensible.calendar.data.EventMappings.Title.name, flex: true},
				{header: 'Ф. И. О.', dataIndex: Extensible.calendar.data.EventMappings.PersonName.name, flex: true}
			],
	        viewConfig: {
	            plugins: {
	                ddGroup: 'GridExample',
	                ptype: 'gridviewdragdrop',
	                enableDrop: false
	            }
	        },
			listeners: {
				itemdblclick: function(grid, record){
					editorWin.show(record);
					console.log(record.data.Title);
				}
						    
			},
			enableDragDrop   : true,
			width            : 300,
			margins          : '0 2 0 0',
			selModel         : Ext.create('Ext.selection.RowModel',{
				singleSelect  : true
			}) 
	});	
	/*
	Ext.create('Ext.Viewport', {
        layout: 'border',
        renderTo: 'simple',
        items: [{
            id: 'app-header',
            region: 'north',
            height: 35,
            border: false,
            contentEl: 'app-header-content'
        },{
       	 id: 'app-center', 
            title: 'Calendar meeting', // will be updated to the current view's date range
            region: 'center',
            layout: 'border',
	         items: [{
	             id:'app-east',
	             region: 'east',
	             //width: 200,
	             border: false,
	             items: [
	            	 createButton, 
	            	 deleteButton,
	            	 table
	            	 ]
	         },formPanel]
        }]
	});	*/		
	var formPanelDropTargetEl =  formPanel.body.dom;
    var formPanelDropTarget = Ext.create('Ext.dd.DropTarget', formPanelDropTargetEl, {
            ddGroup: 'GridExample',
            notifyEnter: function(ddSource, e, data) {
            	formPanel.body.stopAnimation();
                formPanel.body.highlight();
            },
            notifyDrop  : function(ddSource, e, data) {
            var selectedRecord = ddSource.dragData.records[0];
            // formPanel.getForm().loadRecord(selectedRecord);
            // ddSource.view.store.remove(selectedRecord);
			var el = e.getTarget('td', 3);
			var parts = el.id.split(formPanel.activeView.dayElIdDelimiter);
			dt = parts[parts.length-1],
			parsedDate = Ext.Date.parseDate(dt + ' 12:00', 'Ymd G:i');
			selectedRecord.data.startDate = parsedDate;
			selectedRecord.data.endDate = parsedDate;
			//rec = new Extensible.calendar.data.EventModel({ StartDate: parsedDate, EndDate: '2101-01-12 13:30:00', Title: selectedRecord.data.name, Notes: 'Some notes' })
			formPanel.activeView.getEventEditor().show(selectedRecord, null, formPanel.activeView);
            return true;
        }
    });
	

	

});
