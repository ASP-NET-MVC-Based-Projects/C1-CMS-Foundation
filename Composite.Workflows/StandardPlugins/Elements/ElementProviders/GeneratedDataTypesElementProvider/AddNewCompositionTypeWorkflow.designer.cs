using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Drawing;
using System.Reflection;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.Workflow;

namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    partial class AddNewCompositionTypeWorkflow
    {
        #region Designer generated code
        
        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this� method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            this.setStateActivity4 = new System.Workflow.Activities.SetStateActivity();
            this.saveTypeCodeActivity_Save = new System.Workflow.Activities.CodeActivity();
            this.setStateActivity3 = new System.Workflow.Activities.SetStateActivity();
            this.saveHandleExternalEventActivity1 = new Composite.Workflow.Activities.SaveHandleExternalEventActivity();
            this.editTypeDocumentFormActivity = new Composite.Workflow.Activities.DocumentFormActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.initializeStateCodeActivity_Initialize = new System.Workflow.Activities.CodeActivity();
            this.saveTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.editTypeEventDrivenActivity_Save = new System.Workflow.Activities.EventDrivenActivity();
            this.editTypeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.initializeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.cancelHandleExternalEventActivity1 = new Composite.Workflow.Activities.CancelHandleExternalEventActivity();
            this.saveTypeStateActivity = new System.Workflow.Activities.StateActivity();
            this.editTypeStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.initializeStateActivity = new System.Workflow.Activities.StateActivity();
            this.eventDrivenActivity_GlobalCancel = new System.Workflow.Activities.EventDrivenActivity();
            // 
            // setStateActivity4
            // 
            this.setStateActivity4.Name = "setStateActivity4";
            this.setStateActivity4.TargetStateName = "editTypeStateActivity";
            // 
            // saveTypeCodeActivity_Save
            // 
            this.saveTypeCodeActivity_Save.Name = "saveTypeCodeActivity_Save";
            this.saveTypeCodeActivity_Save.ExecuteCode += new System.EventHandler(this.saveTypeCodeActivity_Save_ExecuteCode);
            // 
            // setStateActivity3
            // 
            this.setStateActivity3.Name = "setStateActivity3";
            this.setStateActivity3.TargetStateName = "saveTypeStateActivity";
            // 
            // saveHandleExternalEventActivity1
            // 
            this.saveHandleExternalEventActivity1.EventName = "Save";
            this.saveHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.saveHandleExternalEventActivity1.Name = "saveHandleExternalEventActivity1";
            // 
            // editTypeDocumentFormActivity
            // 
            this.editTypeDocumentFormActivity.ContainerLabel = null;
            this.editTypeDocumentFormActivity.FormDefinitionFileName = "\\Administrative\\AddNewCompositionTypeStep1.xml";
            this.editTypeDocumentFormActivity.Name = "editTypeDocumentFormActivity";
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "editTypeStateActivity";
            // 
            // initializeStateCodeActivity_Initialize
            // 
            this.initializeStateCodeActivity_Initialize.Name = "initializeStateCodeActivity_Initialize";
            this.initializeStateCodeActivity_Initialize.ExecuteCode += new System.EventHandler(this.initializeStateCodeActivity_Initialize_ExecuteCode);
            // 
            // saveTypeStateInitializationActivity
            // 
            this.saveTypeStateInitializationActivity.Activities.Add(this.saveTypeCodeActivity_Save);
            this.saveTypeStateInitializationActivity.Activities.Add(this.setStateActivity4);
            this.saveTypeStateInitializationActivity.Name = "saveTypeStateInitializationActivity";
            // 
            // editTypeEventDrivenActivity_Save
            // 
            this.editTypeEventDrivenActivity_Save.Activities.Add(this.saveHandleExternalEventActivity1);
            this.editTypeEventDrivenActivity_Save.Activities.Add(this.setStateActivity3);
            this.editTypeEventDrivenActivity_Save.Name = "editTypeEventDrivenActivity_Save";
            // 
            // editTypeStateInitializationActivity
            // 
            this.editTypeStateInitializationActivity.Activities.Add(this.editTypeDocumentFormActivity);
            this.editTypeStateInitializationActivity.Name = "editTypeStateInitializationActivity";
            // 
            // initializeStateInitializationActivity
            // 
            this.initializeStateInitializationActivity.Activities.Add(this.initializeStateCodeActivity_Initialize);
            this.initializeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.initializeStateInitializationActivity.Name = "initializeStateInitializationActivity";
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "finalStateActivity";
            // 
            // cancelHandleExternalEventActivity1
            // 
            this.cancelHandleExternalEventActivity1.EventName = "Cancel";
            this.cancelHandleExternalEventActivity1.InterfaceType = typeof(Composite.Workflow.IFormsWorkflowEventService);
            this.cancelHandleExternalEventActivity1.Name = "cancelHandleExternalEventActivity1";
            // 
            // saveTypeStateActivity
            // 
            this.saveTypeStateActivity.Activities.Add(this.saveTypeStateInitializationActivity);
            this.saveTypeStateActivity.Name = "saveTypeStateActivity";
            // 
            // editTypeStateActivity
            // 
            this.editTypeStateActivity.Activities.Add(this.editTypeStateInitializationActivity);
            this.editTypeStateActivity.Activities.Add(this.editTypeEventDrivenActivity_Save);
            this.editTypeStateActivity.Name = "editTypeStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // initializeStateActivity
            // 
            this.initializeStateActivity.Activities.Add(this.initializeStateInitializationActivity);
            this.initializeStateActivity.Name = "initializeStateActivity";
            // 
            // eventDrivenActivity_GlobalCancel
            // 
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.cancelHandleExternalEventActivity1);
            this.eventDrivenActivity_GlobalCancel.Activities.Add(this.setStateActivity1);
            this.eventDrivenActivity_GlobalCancel.Name = "eventDrivenActivity_GlobalCancel";
            // 
            // AddNewCompositionTypeWorkflow
            // 
            this.Activities.Add(this.eventDrivenActivity_GlobalCancel);
            this.Activities.Add(this.initializeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.editTypeStateActivity);
            this.Activities.Add(this.saveTypeStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "initializeStateActivity";
            this.Name = "AddNewCompositionTypeWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private Composite.Workflow.Activities.CancelHandleExternalEventActivity cancelHandleExternalEventActivity1;
        private StateInitializationActivity initializeStateInitializationActivity;
        private SetStateActivity setStateActivity1;
        private StateActivity finalStateActivity;
        private StateActivity initializeStateActivity;
        private Composite.Workflow.Activities.DocumentFormActivity editTypeDocumentFormActivity;
        private SetStateActivity setStateActivity2;
        private StateInitializationActivity editTypeStateInitializationActivity;
        private StateActivity editTypeStateActivity;
        private CodeActivity initializeStateCodeActivity_Initialize;
        private Composite.Workflow.Activities.SaveHandleExternalEventActivity saveHandleExternalEventActivity1;
        private EventDrivenActivity editTypeEventDrivenActivity_Save;
        private CodeActivity saveTypeCodeActivity_Save;
        private StateInitializationActivity saveTypeStateInitializationActivity;
        private StateActivity saveTypeStateActivity;
        private SetStateActivity setStateActivity4;
        private SetStateActivity setStateActivity3;
        private EventDrivenActivity eventDrivenActivity_GlobalCancel;










































































































    }
}
