using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface IFunction : IMetaFunction
	{
        /// <exclude />
        object Execute(ParameterList parameters, FunctionContextContainer context);
	}


    internal static class IFunctionOverloads
    {
        public static T Execute<T>(this IFunction function, NameValueCollection parameters)
        {
            return FunctionFacade.Execute<T>(function, parameters); ;
        }
    }
}
