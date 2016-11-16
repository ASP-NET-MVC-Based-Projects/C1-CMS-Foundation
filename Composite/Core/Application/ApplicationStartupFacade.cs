﻿using System;
using Composite.Core.Application.Foundation;
using Composite.Core.Application.Foundation.PluginFacades;
using Microsoft.Extensions.DependencyInjection;


namespace Composite.Core.Application
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class ApplicationStartupFacade
	{
        /// <exclude />
        public static void FireConfigureServices(IServiceCollection serviceCollection)
        {
            foreach (string hanlderName in ApplicationStartupHandlerRegistry.ApplicationStartupHandlerNames)
            {
                ApplicationStartupHandlerPluginFacade.ConfigureServices(hanlderName, serviceCollection);
            }
        }


        /// <exclude />
        public static void FireBeforeSystemInitialize()
        {
            foreach (string hanlderName in ApplicationStartupHandlerRegistry.ApplicationStartupHandlerNames)
            {
                ApplicationStartupHandlerPluginFacade.OnBeforeInitialize(hanlderName);
            }
        }


        /// <exclude />
        public static void FireSystemInitialized()
        {
            foreach (string hanlderName in ApplicationStartupHandlerRegistry.ApplicationStartupHandlerNames)
            {
                ApplicationStartupHandlerPluginFacade.OnInitialized(hanlderName);
            }
        }
	}
}
