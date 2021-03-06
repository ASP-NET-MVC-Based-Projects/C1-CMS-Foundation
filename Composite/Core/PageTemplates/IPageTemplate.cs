﻿using System;

namespace Composite.Core.PageTemplates
{
    /// <summary>
    /// Basic interface for classes that represent a page template
    /// </summary>
    public interface IPageTemplate
    {
        /// <summary>
        /// Gets the template id.
        /// </summary>
        Guid TemplateId { get; }

        /// <summary>
        /// Gets the template title.
        /// </summary>
        string TemplateTitle { get; }
    }
}
