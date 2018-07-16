/**
 * Created by I332893 on 6/25/2018.
 */
(function () {
	"use strict";
	/*global sap, jQuery */

	sap.ui.controller("mock.OVPMockTest1.ext.task.Task", {

		onAfterRendering: function () {
			var oView = this.getView(),
				oCardPropertiesModel = oView.getModel("ovpCardProperties"),
				aTasks = oCardPropertiesModel.getProperty("/tasks"),
				i,
				oTasksFlexBox = oView.byId("tasks");
			oTasksFlexBox.removeAllItems();
			for (i = 0; i < aTasks.length; i++) {
				oTasksFlexBox.addItem(new sap.m.HBox({
					items: [
						new sap.m.CheckBox({
							text: aTasks[i].text,
							selected: aTasks[i].selected,
							enabled: aTasks[i].enabled,
							select: this.onItemSelected.bind(this)
						})
					]
				}));
			}
		},

		onItemSelected: function (oEvent) {
			var oSource = oEvent.getSource();
			oSource.setEnabled(false);

			var oView = this.getView(),
				oTasksFlexBox = oView.byId("tasks"),
				oCardPropertiesModel = oView.getModel("ovpCardProperties"),
				aTasks = oCardPropertiesModel.getProperty("/tasks");

			var iIndex = oTasksFlexBox.indexOfItem(oSource.getParent());
			aTasks[iIndex].enabled = false;
			aTasks[iIndex].selected = true;

			oCardPropertiesModel.setProperty("/tasks", aTasks);
			oCardPropertiesModel.refresh(true);
		},

		onAddTask: function (oEvent) {
			var oSaveButton = new sap.m.Button({
				text: "Save",
				type: "Emphasized"
			});
			// settings dialog close button
			var oCancelButton = new sap.m.Button({
				text: "Cancel"
			});
			var oDialog = new sap.m.Dialog({
				title: "Create a Task",
				modal: true,
				contentWidth: "1em",
				buttons: [oSaveButton, oCancelButton],
				content: [
					new sap.m.Label({
						text: "Task Name"
					}),
					new sap.m.Input({
						maxLength: 100
					})
				]
			}).addStyleClass("sapUiContentPadding");
			oCancelButton.attachPress(function () {
				oDialog.close();
			});
			
			oSaveButton.attachPress(function () {
				var oView = this.getView(),
				oCardPropertiesModel = oView.getModel("ovpCardProperties"),
				aTasks = oCardPropertiesModel.getProperty("/tasks");

				aTasks.unshift({
					"text": oDialog.getContent()[1].getValue(),
					"enabled": true,
					"selected": false
				});
	
				oCardPropertiesModel.setProperty("/tasks", aTasks);
				oCardPropertiesModel.refresh(true);
				this.getOwnerComponent().getComponentData().mainComponent.getLayout().rerender();
				oDialog.close();
			}.bind(this));
			
			oDialog.open();
		}
	});
})();