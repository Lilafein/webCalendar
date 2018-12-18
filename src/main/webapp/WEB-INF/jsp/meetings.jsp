<!DOCTYPE html>
<html>
<head>
    <title>Extensible : Basic Calendar</title>

    <!-- This is required for most non-English locales! -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf8">
	<link href="lib/ext-theme-classic-all.css" rel="stylesheet" type="text/css"/>

    <!-- Sets up all Ext and Extensible includes: -->
	<script type="text/javascript" src="/lib/ext-all-debug.js"></script>
    <script type="text/javascript" src="/Extensible-config.js"></script>
	
	
    
    <!-- Page-specific includes -->
    <script type="text/javascript" src="basic.js"></script>
    <style>
        .sample-ct {      
            height: 500px;
        }
    </style>
</head>
<body>
    <div id="sample-overview">
        <h1>Basic Calendar Examples</h1>
        <p>An assortment of basic, standalone CalendarPanels with different configurations. Note that unless otherwise indicated the calendars
        all share the same underlying data store, so changes in one calendar will update the others.</p>
        
        <p class="view-src"><a target="_blank" href="basic.js">View the source</a></p>
    </div>
    
    <h2>Simplest Example</h2>
    <p>This is an example of the most basic CalendarPanel configuration with all default options.  It does not have multiple calendar support
    by default (unless you provide a calendar store) and so all events simply use a deafult color.</p>
    <div id="simple" class="sample-ct"></div>
    
    <h2>Panel Configs</h2>
    <p>This example shows the CalendarPanel with additional standard Panel configs applied, showing that it can be used just like any
    other Panel subclass in Ext JS. It also defaults to the week view to show that you can start with whichever view you want.</p>
    
    <div id="panel" class="sample-ct"></div>
</body>
</html>e