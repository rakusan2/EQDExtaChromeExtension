declare namespace chrome{
    export namespace accessibilityFeatures{

    }
    export namespace alarms{

    }
    export namespace alarms{

    }
    export namespace bookmarks{

    }
    export namespace browserAction{

    }
    export namespace browsingData{

    }
    export namespace certificateProvider{

    }
    export namespace commands{

    }
    export namespace contentSettings{

    }
    export namespace contextMenus{

    }
    export namespace cookies{

    }
    //export namespace debugger{
        //
    //}
    /** Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.  */
    export namespace declarativeContent{
        type PageStateMatcherInstanceType=
            "declarativeContent.PageStateMatcher"
        type ShowPageActionInstanceType =
            "declarativeContent.ShowPageAction"
        type SetIconInstanceType =
            "declarativeContent.SetIcon"
        type RequestContentScriptInstanceType =
            "declarativeContent.RequestContentScript"
        /** Matches the state of a web page by various criteria. */
        interface PageStateMatcher{
            pageUrl?:events.UrlFilter,
            css?:string[],
            isBookmarked?:boolean
        }
        class PageStateMatcher{
            constructor(psm:PageStateMatcher)
        }

        /** Declarative event action that shows the extension's page action while the corresponding conditions are met. This action can be used without host permissions, but the extension must have a page action. If the extension takes the activeTab permission, a click on the page action will grant access to the active tab. */
        var ShowPageAction
        /** Declarative event action that sets the n-dip square icon for the extension's page action or browser action while the corresponding conditions are met. This action can be used without host permissions, but the extension must have page or browser action. */
        interface SetIcon{
            imageData?:ImageData | Object
        }
        /** Declarative event action that injects a content script.
         * ***
         * WARNING: This action is still experimental and is not supported on stable builds of Chrome.
         */
        interface RequestContentScript{
            /** Names of CSS files to be injected as a part of the content script. */
            css?:string[],
            /** Names of Javascript files to be injected as a part of the content script. */
            js?:string[],
            /** Whether the content script runs in all frames of the matching page, or only the top frame. Default is false. */
            allFrames?:boolean,
            /** Whether to insert the content script on about:blank and about:srcdoc. Default is false. */
            matchAboutBlank?:boolean
        }
        var onPageChanged:events.Event
    }
    export namespace desktopCapture{

    }
    export namespace devtools{
        namespace inspectedWindow{

        }
        namespace network{
            
        }
        namespace panels{
            
        }
    }
    export namespace documentScan{

    }
    export namespace downloads{

    }
    export namespace enterprise{
        namespace deviceAttributes{
            
        }
        namespace platformKeys{
            
        }
    }
    /** contains common types used by APIs dispatching events to notify you when something interesting happens. */
    export namespace events{
        /** Description of a declarative rule for handling events.*/
        interface Rule{
            /** Identifier that allows referencing this rule. */
            id?:string;
            /** Tags can be used to annotate rules and perform operations on sets of rules. */
            tags?:string[];
            /** List of conditions that can trigger the actions. */
            conditions:any[];
            /** List of actions that are triggered if one of the condtions is fulfilled. */
            actions:any[]
            /**Optional priority of this rule. Defaults to 100. */
            priority?:number;
        }
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        interface Event{
            /** Registers an event listener callback to an event. */
            addListener(callback:()=>void,filter?:{url?:UrlFilter[]}):void
            /** Deregisters an event listener callback from an event. */
            removeListener(callback:(a?:any)=>void):void
            hasListener(callabck:(a?:any)=>void):boolean
            hasListeners():boolean
            /** Registers rules to handle events. */
            addRules(rules:Rule[],callback?:(rules?:Rule[])=>void):void
            /** Returns currently registered rules. */
            getRules(ruleIdentifiers:string[],callback:(rules:Rule[])=>void):void
            /** Unregisters currently registered rules. */
            removeRules(ruleIdentifiers:string[],callback:()=>void):void
        }
        interface UrlFilter{
            /** Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name. */
            hostContains?:string;
            /** Matches if the host name of the URL is equal to a specified string. */
            hostEquals?:string;
            /** Matches if the host name of the URL starts with a specified string. */
            hostPrefix?:string;
            /** Matches if the host name of the URL ends with a specified string. */
            hostSuffix?:string;
            /** Matches if the path segment of the URL contains a specified string. */
            pathContains?:string;
            /** Matches if the path segment of the URL is equal to a specified string. */
            pathEquals?:string;
            /** Matches if the path segment of the URL starts with a specified string. */
            pathPrefix?:string;
            /** Matches if the path segment of the URL ends with a specified string. */
            pathSuffix?:string;
            /** Matches if the query segment of the URL contains a specified string. */
            queryContains?:string;
            /** Matches if the query segment of the URL is equal to a specified string. */
            queryEquals?:string;
            /** Matches if the query segment of the URL starts with a specified string. */
            queryPrefix?:string;
            /** Matches if the query segment of the URL ends with a specified string. */
            querySuffix?:string;
            /** Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlContains?:string;
            /** Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlEquals?:string;
            /** Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax. */
            urlMatches?:string;
            /** Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.*/
            originAndPathMatches?:string;
            /** Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.*/
            urlPrefix?:string;
            /** Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.*/
            urlSuffix?:string;
            /** Matches if the scheme of the URL is equal to any of the schemes specified in the array.*/
            schemes?:string[];
            /** Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.*/
            ports?:number[]|number[][];
        }
    }
    /** The chrome.extension API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.  */
    export namespace extension{
        /** The type of extension view. */
        type ViewType="tab"|"popup"
        /** Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be undefined. */
        var lastError:{message:string};
        /** True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior. */
        var inIncognitoContext:boolean;
        /** Converts a relative path within an extension install directory to a fully-qualified URL. */
        function getURL(path:string):string
        /** Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. */
        function getViews(fetchProperties?:{type?:ViewType,windowId:number,tabId:number}):void
        /** Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page. */
        function getBackgroundPage():Window
        /** Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox. */
        function isAllowedIncognitoAccess(callback:(isAllowedAccess:boolean)=>void):void
        /** Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox. */
        function isAllowedFileSchemeAccess(callback:(isAllowedAccess:boolean)=>void):void
        /** Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery. */
        function setUpdateUrlData(data:string):void;
    }
    export namespace extensionTypes{

    }
    export namespace fileBrowserHandler{

    }
    export namespace fileSystemProvider{

    }
    export namespace fontSettings{

    }
    export namespace gcm{

    }
    export namespace history{

    }
    export namespace i18n{

    }
    export namespace identity{

    }
    export namespace input{
        namespace ime{

        }
    }
    export namespace instanceID{

    }
    export namespace management{

    }
    export namespace networking{
        namespace config{

        }
    }
    export namespace notifications{

    }
    export namespace omnibox{

    }
    export namespace pageAction{
        interface ImageDataType{

        }
        /** Shows the page action. The page action is shown whenever the tab is selected. */
        function show(tabId:number):void;
        /** Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out. */
        function hide(tabId:number):void;
        /** Sets the title of the page action. This is displayed in a tooltip over the page action. */
        function setTitle(details:{tabId:number,title:string}):void;
        /** Gets the title of the page action. */
        function getTitle(details:{tabId:number},callback:(result:string)=>void):void;
        /** Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified. */
        function setIcon(details:{tabId:number,imageData?:ImageDataType|Object,path?:string|Object,iconIndex?:number},callback:()=>void):void;
        /** Sets the html document to be opened as a popup when the user clicks on the page action's icon. */
        function setPopup(details:{tabId:number,popup:string}):void;
        /** Gets the html document set as the popup for this page action. */
        function getPopup(details:{tabId:number},callback:(result:string)=>void):void;
        /** Fired when a page action icon is clicked. This event will not fire if the page action has a popup. */
        interface onClicked extends events.Event{
            addListener(callback:(tab:tabs.Tab)=>void):void
        }
        var onClicked:onClicked
    }
    export namespace pageCapture{

    }
    export namespace permissions{

    }
    export namespace platformKeys{

    }
    export namespace power{

    }
    export namespace printerProvider{

    }
    export namespace privacy{

    }
    export namespace proxy{

    }
    /**  Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs. */
    export namespace runtime{
        /** An object which allows two way communication with other pages. See Long-lived connections for more information. */
        interface Port{
            /** The name of the port, as specified in the call to runtime.connect. */
            name:string,
            /** Immediately disconnect the port. Calling disconnect() on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port. */
            disconnect:()=>void,
            /** Fired when the port is disconnected from the other end(s). runtime.lastError may be set if the port was disconnected by an error. If the port is closed via disconnect, then this event is only fired on the other end. This event is fired at most once (see also Port lifetime). The first and only parameter to the event handler is this disconnected port. */
            onDisconnect:events.Event,
            /** This event is fired when postMessage is called by the other end of the port. The first parameter is the message, the second parameter is the port that received the message. */
            onMessage:events.Event,
            /** Send a message to the other end of the port. If the port is disconnected, an error is thrown. */
            postMessage:(message)=>void,
            /** This property will only be present on ports passed to onConnect / onConnectExternal listeners. */
            sender?:MessageSender
        }
        /** An object containing information about the script context that sent a message or request. */
        interface MessageSender{
            /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
            tab?:tabs.Tab,
            /** The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set. */
            frameId:number,
            /** The ID of the extension or app that opened the connection, if any. */
            id:string,
            /** The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it. */
            url:string,
            /** The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available. */
            tlsChannelId:string
        }
        /** The operating system chrome is running on. */
        type PlatformOs =
            "mac"|
            "win"|
            "android"|
            "cros"|
            "linux"|
            "openbsd"
        /** The machine's processor architecture. */
        type PlatformArch=
            "arm"|
            "x86-32"|
            "x86-64"
        /** The native client architecture. This may be different from arch on some platforms. */
        type PlatformNaclArch=
            "arm"|
            "x86-32"|
            "x86-64"
        /** An object containing information about the current platform. */
        interface PlatformInfo{
            os:PlatformOs,
            arch:PlatformArch,
            nacl_arch:PlatformNaclArch
        }
        /** Result of the update check. */
        type RequestUpdateCheckStatus=
            "throttled"|
            "no_update"|
            "update_available"
        /** The reason that this event is being dispatched. */
        type OnInstalledReason=
            "install"|
            "update"|
            "chrome_update"|
            "shared_module_update"
        /** The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy. */
        type OnRestartRequiredReason=
            "app_update"|
            "os_update"|
            "periodic"


        /** Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode. */
        var onStartup:events.Event
        /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
        interface onInstalled extends events.Event{
            addListener(callback:(details:{reason:OnInstalledReason,previousVersion:string,id:string})=>void)
        }
        var onInstalled:onInstalled
        /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
        var onSuspend:events.Event
        /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
        var onSuspendCanceled:events.Event
        /** Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event. */
        interface onUpdateAvailable extends events.Event{
            addListener(callback:(details:{version:string})=>void):void
        }
        /** Fired when a connection is made from either an extension process or a content script (by runtime.connect). */
        interface onConnect extends events.Event{
            addListener(callback:(port:Port)=>void):void
        }
        var onConnect: onConnect
        /** Fired when a connection is made from another extension (by runtime.connect). */
        interface onConnectExternal extends events.Event{
            addListener(callback:(port:Port)=>void):void
        }
        var onConnectExternal:onConnectExternal
        /** Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage). */
        interface onMessage extends events.Event{
            addListener(callback:(message,sender:MessageSender,sendResponse:(response:Object|true)=>void)=>void):void
        }
        var onMessage:onMessage
        /** Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script. */
        var onMessageExternal :onMessage
        /**  */
        interface onRestartRequired extends events.Event{
            addListener(callback:(reason:OnRestartRequiredReason)=>void):void
        }
        var onRestartRequired:onRestartRequired


        /** This will be defined during an API method callback if there was an error */
        var lastError:{message?:string}
        /** The ID of the extension/app. */
        var id : string


        /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
        function getBackgroundPage(callback:(backgroundPage?:Window)=>void):void
        /** Open your Extension's options page, if possible.
         * ***
         * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload. */
        function openOptionsPage(callback?:()=>void):void
        /** Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file. */
        function getManifest():Object
        /** Converts a relative path within an app/extension install directory to a fully-qualified URL. */
        function getURL(path:String):String
        /** Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters. */
        function setUninstallURL(url:String,callback?:()=>void):void
        /** Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method. */
        function reload():void
        /** Requests an immediate update check be done for this app/extension.
         * ***
         * Important: Most extensions/apps should not use this method, since chrome already does automatic checks every few hours, and you can listen for the runtime.onUpdateAvailable event without needing to call requestUpdateCheck. */
         function requestUpdateCheck(callback:(status:RequestUpdateCheckStatus,details?:{version:string})=>void):void
         /** Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op. */
         function restart():void
         /** Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API. */
         function restartAfterDelay(seconds:number,callback?:()=>void):void
         /** Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect. */
         function connect(extensionId?:String,connectInfo?:{name?:string,includeTlsChannelId?:boolean}):Port
         /** Connects to a native application in the host machine. See Native Messaging for more information */
         function connectNative(application:string):Port
         /** Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage. */
         function sendMessage(extensionId:string,message,options:{includeTlsChannelId?:boolean},responseCallback?:(response)=>void):void
         /** Send a single message to a native application. */
         function sendNativeMessage(application:string,message:Object,responseCallback?:(response)=>void):void
         /** Returns information about the current platform. */
         function getPlatformInfo(callback:(platformInfo:PlatformInfo)=>void):void
         /** Returns a DirectoryEntry for the package directory. */
         function getPackageDirectoryEntry(callback:(directoryEntry:Object)=>void):void

    }
    export namespace sessions{

    }
    export namespace storage{

    }
    export namespace system{
        namespace cpu{

        }
        namespace memory{

        }
        namespace storage{

        }
    }
    export namespace tabCapture{

    }
    export namespace tabs{
        /** An event that caused a muted state change. */
        type MutedInfoReason =
            "user"|
            "capture"|
            "extension"
        /** Tab muted state and the reason for the last state change. */
        interface MutedInfo{
            /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
            muted:boolean,
            /** The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed. */
            reason?:MutedInfoReason
            /** The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed. */
            extensionId?:string
        }
        interface Tab{
            /** The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows. */
            id?:number,
            /** The zero-based index of the tab within its window. */
            index:number,
            /** The ID of the window the tab is contained within. */
            windowId:number,
            /** The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists. */
            openerTabId?:number,
            /** Whether the tab is highlighted. */
            highlighted:boolean,
            /** Whether the tab is active in its window. (Does not necessarily mean the window is focused.) */
            active:boolean,
            /** Whether the tab is pinned. */
            pinned:boolean,
            /** Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing. */
            audible?:boolean,
            /** Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated. */
            discarded:boolean,
            /** Whether the tab can be discarded automatically by the browser when resources are low. */
            autoDiscardable:boolean,
            /** Current tab muted state and the reason for the last state change. */
            mutedInfo?:MutedInfo,
            /** The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission. */
            url?:string,
            /** The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission. */
            title?:string,
            /** The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading. */
            favIconUrl?:string,
            /** Either loading or complete. */
            status?:string,
            /** Whether the tab is in an incognito window. */
            incognito:boolean,
            /** The width of the tab in pixels. */
            width?:number,
            /** The height of the tab in pixels. */
            height?:number,
            /** The session ID used to uniquely identify a Tab obtained from the sessions API. */
            sessionId?:string
        }
        /** Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to automatic. */
        type ZoomSettingsMode =
            "automatic"|
            "manual"|
            "disabled"
        /** Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise. */
        type ZoomSettingsScope =
            "per-origin"|
            "per-tab"
        /** Defines how zoom changes in a tab are handled and at what scope. */
        interface ZoomSettings{
            /** Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to automatic. */
            mode?:ZoomSettingsMode,
            /** Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise. */
            scope?:ZoomSettingsScope,
            /** Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings. */
            defaultZoomFactor?:number
        }
        /** Whether the tabs have completed loading. */
        type TabStatus =
            "loading"|
            "complete"
        /** The type of window. */
        type WindowType =
            "normal"|
            "popup"|
            "panel"|
            "app"|
            "devtools"
        /** An ID which represents the absence of a browser tab. */
        var TAB_ID_NONE:number
        /** Retrieves details about the specified tab. */
        function get(tabId:number,callback:(tab:Tab)=>void):void
        /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
        function getCurrent(callback:(tab:Tab)=>void):void
        /** Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see Content Script Messaging. */
        function connect(tabId:number,connectInfo?:{name?:string,frameId:number}):void
        /** Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension. */
        function sendMessage(tabId:number,message,options?:{frameId?:number},responseCallback?:(response)=>void):void;
        interface createProperties{
            /** The window to create the new tab in. Defaults to the current window. */
            windowId?:number,
            /** The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
            index?:number,
            /** The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page. */
            url?:string,
            /** Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true. */
            active?:boolean,
            /** Whether the tab should be pinned. Defaults to false */
            pinned?:boolean,
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab. */
            openerTabId?:number
        }
        /** Creates a new tab. */
        function create(createProperties:createProperties,callback?:(tab:Tab)=>void):void
        /** Duplicates a tab. */
        function duplicate(tabId:number,callback?:(tab:Tab)=>void):void;
        interface queryInfo{
            /** Whether the tabs are active in their windows. */
            active?:boolean,
            /** Whether the tabs are pinned. */
            pinned?:boolean,
            /** Whether the tabs are audible. */
            audible?:boolean,
            /** Whether the tabs are muted. */
            muted?:boolean,
            /** Whether the tabs are highlighted. */
            highlighted?:boolean,
            /** Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated. */
            discarded?:boolean,
            /** Whether the tabs can be discarded automatically by the browser when resources are low. */
            autoDiscardable?:boolean,
            /** Whether the tabs are in the current window. */
            currentWindow?:boolean,
            /** Whether the tabs are in the last focused window. */
            lastFocusedWindow?:boolean,
            /** Whether the tabs have completed loading. */
            status?:TabStatus,
            /** Match page titles against a pattern. Note that this property is ignored if the extension doesn't have the "tabs" permission. */
            title?:string,
            /** Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. Note that this property is ignored if the extension doesn't have the "tabs" permission. */
            url?:string|string[],
            /** The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
            windowId?:number,
            /** The type of window the tabs are in. */
            windowType?:WindowType,
            /** The position of the tabs within their windows. */
            index?:number
        }
        /** Gets all tabs that have the specified properties, or all tabs if no properties are specified. */
        function query(queryInfo:queryInfo,callback:(result:Tab[])=>void):void
        /** Highlights the given tabs. */
        function highlight(highlightInfo:{windowId?:number,tabs:number|number[]},callback?:(window:windows.Window)=>void):void;
        interface updateProperties{
            /** A URL to navigate the tab to. */
            url?:string,
            /** Whether the tab should be active. Does not affect whether the window is focused (see windows.update). */
            active?:boolean,
            /** Adds or removes the tab from the current selection. */
            highlighted?:boolean,
            /** Whether the tab should be pinned. */
            pinned?:boolean,
            /** Whether the tab should be muted. */
            muted?:boolean,
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab. */
            openerTabId?:number,
            /** Whether the tab should be discarded automatically by the browser when resources are low. */
            autoDiscardable?:boolean
        }
        /** Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified. */
        function update(tabId:number,updateProperties:updateProperties,callback?:(tab:Tab)=>void):void
        /** Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows. */
        function move(tabIds:number|number[],moveProperties:{windowId?:number,index:number},callback?:(tabs:Tab|Tab[])=>void):void
        /** Reload a tab */
        function reload(tabId?:number,reloadProperties?:{bypassCache?:boolean},callback?:()=>void):void
        /** Closes one or more tabs. */
        function remove(tabIds:number|number[],callback?:()=>void):void
        /** Detects the primary language of the content in a tab. */
        function detectLanguage(tabId:number,callback:(language:string)=>void):void
        /** Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method. */
        function captureVisibleTab(windowId:number,options:{format?:"jpeg"|"png",quality?:number},callback:(dataUrl:string)=>void):void;
        interface scriptDetails{
            /** JavaScript or CSS code to inject. 
             * ***
             * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
            */
            code?:string,
            /** JavaScript or CSS file to inject. */
            file?:string,
            /** If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame. If true and frameId is set, then the code is inserted in the selected frame and all of its child frames. */
            allFrames?:boolean,
            /** The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame). */
            frameId?:number,
            /** If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false. */
            matchAboutBlank?:boolean,
            /** The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle". */
            runAt?:"document_start"|"document_end"|"document_idle"
        }
        /** Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc. */
        function executeScript(tabId:number,details:scriptDetails,callback?:(result:any[])=>void):void
        /** Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc. */
        function insertCSS(tabId:number,details:scriptDetails,callback?:()=>void):void
        /** Zooms a specified tab. */
        function setZoom(tabId:number,zoomFactor:number,callback?:()=>void):void
        /** Gets the current zoom factor of a specified tab. */
        function getZoom(tabId:number,callback:(zoomFactor:number)=>void):void
        /** Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab. */
        function setZoomSettings(tabId:number,zoomSettings:ZoomSettings,callback?:()=>void):void
        /** Gets the current zoom settings of a specified tab. */
        function getZoomSettings(tabId:number,callback:(zoomSettings:ZoomSettings)=>void):void
        /** Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated. */
        function discard(tabId?:number,callback?:(tab:Tab)=>void):void;
        /** Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
        interface onCreated extends events.Event{
            addListener(callback:(tab:Tab)=>void):void
        }
        var onCreated:onCreated
        interface changeInfo{
            /** The status of the tab. Can be either loading or complete. */
            status?:"loading"|"complete",
            /** The tab's URL if it has changed. */
            url?:string,
            /** The tab's new pinned state. */
            pinned?:boolean,
            /** The tab's new audible state. */
            audible?:boolean,
            /** The tab's new discarded state. */
            discarded?:boolean,
            /** The tab's new auto-discardable state. */
            autoDiscardable?:boolean,
            /** The tab's new muted state and the reason for the change. */
            mutedInfo?:MutedInfo,
            /** The tab's new favicon URL. */
            favIconUrl?:string,
            /** The tab's new title. */
            title?:string
        }
        /** Fired when a tab is updated. */
        interface onUpdated extends events.Event{
            addListener(callback:(tabId:number,changeInfo:changeInfo,tab:Tab)=>void):void
        }
        var onUpdated:onUpdated
        /** Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see tabs.onDetached. */
        interface onMoved{
             addListener(callback:(tabId:number,moveInfo:{windowId:number,fromIndex:number,toIndex:number})=>void):void
        }
        var onMoved:onMoved
        /** Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
        interface onActivated extends events.Event{
            addListener(callback:(activeInfo:{tabId:number,windowId:number})=>void):void
        }
        var onActivated:onActivated
        /** Fired when the highlighted or selected tabs in a window changes. */
        interface onHighlighted extends events.Event{
            addListener(callback:(highlightInfo:{windowId:number,tabIds:number[]})=>void):void
        }
        var onHighlighted:onHighlighted
        /** Fired when a tab is detached from a window, for example because it is being moved between windows. */
        interface onDetached extends events.Event{
            addListener(callback:(tabId:number,detachInfo:{oldWindowId:number,oldPosition:number})=>void):void
        }
        var onDetached:onDetached
        /** Fired when a tab is attached to a window, for example because it was moved between windows. */
        interface onAttached extends events.Event{
            addListener(callback:(tabId:number,attachInfo:{newWindowId:number,newPosition:number})=>void):void
        }
        var onAttached:onAttached
        /** Fired when a tab is closed. */
        interface onRemoved extends events.Event{
            addListener(callback:(tabId:number,removeInfo:{windowId:number,isWindowClosing:boolean})=>void):void
        }
        var onRemoved:onRemoved
        /** Fired when a tab is replaced with another tab due to prerendering or instant. */
        interface onReplaced extends events.Event{
            addListener(callback:(addedTabId:number,removedTabId:number)=>void):void
        }
        var onReplaced:onReplaced
        /** Fired when a tab is zoomed. */
        interface onZoomChange extends events.Event{
            addListener(callback:(ZoomChangeInfo:{tabId:number,oldZoomFactor:number,newZoomFactor:number,zoomSettings:ZoomSettings})=>void):void
        }
        var onZoomChange:onZoomChange
    }
    export namespace topSites{

    }
    export namespace tts{

    }
    export namespace ttsEngine{

    }
    export namespace types{

    }
    export namespace vpnProvider{

    }
    export namespace wallpaper{

    }
    export namespace webNavigation{

    }
    export namespace webRequest{
        type ResourceType="main_frame"| "sub_frame"| "stylesheet"| "script"| "image"| "font"| "object"| "xmlhttprequest"| "ping"| "other"
        type OnBeforeRequestOptions="blocking"| "requestBody"
        type OnBeforeSendHeadersOptions="requestHeaders"| "blocking"
        type OnSendHeadersOptions="requestHeaders"
        type OnHeadersReceivedOptions="blocking"|"responseHeaders"
        type OnAuthRequiredOptions="responseHeaders"| "blocking"| "asyncBlocking"
        type OnResponseStartedOptions="responseHeaders"
        type OnBeforeRedirectOptions="responseHeaders"
        type OnCompletedOptions="responseHeaders"
        /** An object describing filters to apply to webRequest events. */
        interface RequestFilter{
            /** A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out. */
            urls:string[]
            /** A list of request types. Requests that cannot match any of the types will be filtered out. */
            types?:ResourceType[]
            tabId?:number
            windowId?:number
        }
        type HttpHeaders = ({name:string}&({value:string}|{binaryValue:number[]}))[]
        interface BlockingResponse{
            /** If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent. */
            cancel?:boolean,
            /** Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as data: are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. */
            redirectUrl?:string,
            /** Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead. */
            requestHeaders?:HttpHeaders,
            /** Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return responseHeaders if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify responseHeaders for each request). */
            responseHeaders?:HttpHeaders,
            /** Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials. */
            authCredentials?:{username:string,password:string}
        }
        interface UploadData{
            /** An ArrayBuffer with a copy of the data. */
            bytes?:any,
            /** A string with the file's path and name. */
            file?:string
        }
        /** The maximum number of times that handlerBehaviorChanged can be called per 10 minute sustained interval. handlerBehaviorChanged is an expensive function call that shouldn't be called often. */
        var MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES:number
        /** Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often. */
        function handlerBehaviorChanged(callback?:()=>any)
        interface requestDetails{
            /** The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request. */
            requestId:string,
            url:string,
            /** Standard HTTP method. */
            method:string,
            /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab */
            frameId:number,
            /** ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists. */
            parentFrameId:number,
            /** The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab. */
            tabId:number,
            /** How the requested resource will be used. */
            type:ResourceType,
            /** The time when this signal is triggered, in milliseconds since the epoch. */
            timeStamp:number
        }
        interface beforeRequest extends requestDetails{
            /** Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'. */
            requestBody?:{
                /** Errors when obtaining request body data. */
                error?:string,
                /** If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. 
                 * 
                 * An example value of this dictionary is {'key': ['value1', 'value2']}. */
                formData?:{[key:string]:[string,string]},
                /** If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array. */
                raw?:UploadData[]
            }
        }
        /** Fired when a request is about to occur. */
        interface onBeforeRequest extends events.Event{
            addListener(callback:(details:beforeRequest)=>BlockingResponse,filter:RequestFilter,options:['blocking'])
            addListener(callback:(details:beforeRequest)=>any,filter:RequestFilter,options?:OnBeforeRequestOptions[])
        }
        var onBeforeRequest:onBeforeRequest
        interface sendHeaders extends requestDetails{
            requestHeaders?:HttpHeaders
        }
        /** Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. */
        interface onBeforeSendHeaders extends events.Event{
            addListener(callback:(details:sendHeaders)=>any,filter:RequestFilter,options?:OnBeforeSendHeadersOptions[])
        }
        var onBeforeSendHeaders:onBeforeSendHeaders
        /** Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired). */
        interface onSendHeaders extends events.Event{
            addListener(callback:(details:sendHeaders)=>any,filter:RequestFilter,options?:OnSendHeadersOptions[])
        }
        var onSendHeaders:onSendHeaders
        interface headersRecieved extends requestDetails{
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line). */
            statusLine:string,
            /** The HTTP response headers that have been received with this response. */
            responseHeaders?:HttpHeaders,
            /** Standard HTTP status code returned by the server. */
            statusCode:number
        }
        /** Fired when HTTP response headers of a request have been received. */
        interface onHeadersReceived extends events.Event{
            addListener(callback:(details:headersRecieved)=>BlockingResponse,filter:RequestFilter,options?:['blocking'])
            addListener(callback:(details:headersRecieved)=>any,filter:RequestFilter,options?:OnHeadersReceivedOptions[])
        }
        var onHeadersReceived:onHeadersReceived
        interface authRequired extends headersRecieved{
            /** The authentication scheme, e.g. Basic or Digest. */
            scheme:string,
            /** The authentication realm provided by the server, if there is one. */
            realm?:string,
            /** The server requesting authentication. */
            challenger:{host:string,port:number},
            /** True for Proxy-Authenticate, false for WWW-Authenticate. */
            isProxy:boolean,
        }
        /** Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request. */
        interface onAuthRequired extends events.Event{
            addListener(callback:(details:authRequired,callback?:(response:BlockingResponse)=>any)=>any,filter:RequestFilter,options?:OnAuthRequiredOptions[])
        }
        var onAuthRequired:onAuthRequired
        interface responseStarted extends headersRecieved{
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?:string,
            /** Indicates if this response was fetched from disk cache. */
            fromCache:boolean,
        }
        /** Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available. */
        interface onResponseStarted extends events.Event{
            addListener(callback:(details:responseStarted)=>any,filter:RequestFilter,options?:OnResponseStartedOptions[])
        }
        var onResponseStarted:onResponseStarted
        interface beforeRedirect extends responseStarted{
            /** The new URL. */
            redirectUrl:string,
        }
        /** Fired when a server-initiated redirect is about to occur. */
        interface onBeforeRedirect extends events.Event{
            addListener(callback:(details:beforeRedirect)=>any,filter:RequestFilter,options?:OnBeforeRedirectOptions[])
        }
        var onBeforeRedirect:onBeforeRedirect
        /** Fired when a request is completed. */
        interface onCompleted extends events.Event{
            addListener(callback:(details:responseStarted)=>any,filter:RequestFilter,options?:OnCompletedOptions[])
        }
        var onCompleted:onCompleted
        interface errorOccured extends requestDetails{
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?:string,
            /** Indicates if this response was fetched from disk cache. */
            fromCache:boolean,
            /** The error description. This string is not guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content. */
            error:string
        }
        interface onErrorOccurred extends events.Event{
            addListener(callback:(details:errorOccured)=>any,filter:RequestFilter)
        }
        var onErrorOccurred:onErrorOccurred
    }
    export namespace webstore{

    }
    export namespace windows{
        interface Window{

        }
    }
}