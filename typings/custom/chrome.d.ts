declare namespace chrome {
    export namespace accessibilityFeatures {

    }
    export namespace alarms {

    }
    export namespace bookmarks {

    }
    /** Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup. */
    export namespace browserAction {
        type ColorArray = number[]
        type ImageDataType = ImageData;
        type ImageDictionary = { [size: string]: ImageDataType }
        type ImagePathDictionary = { [size: string]: string }

        /** Sets the title of the browser action. This shows up in the tooltip. */
        function setTitle(details: {
            /** The string the browser action should display when moused over. */
            title: string,
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number
        })
        /** Gets the title of the browser action. */
        function getTitle(details: { tabId?: number }, callback: (result: string) => any)
        interface iconDetails {
            /** Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. */
            imageData?: ImageDataType | ImageDictionary,
            /** Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * n will be selected, where n is the size of the icon in the UI. At least one image must be specified. */
            path?: string | ImagePathDictionary,
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number
        }
        /** Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified. */
        function setIcon(details: iconDetails, callback?: () => any)
        /** Sets the html document to be opened as a popup when the user clicks on the browser action's icon. */
        function setPopup(details: {
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number,
            /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
            popup: string
        })
        /** Gets the html document set as the popup for this browser action. */
        function getPopup(details: { tabId?: number }, callback: (result: string) => any)
        /** Sets the badge text for the browser action. The badge is displayed on top of the icon. */
        function setBadgeText(details: {
            /** Any number of characters can be passed, but only about four can fit in the space. */
            text: string,
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number
        })
        /** Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned. */
        function getBadgeText(details: { tabId?: number }, callback: (result: string) => any)
        /** Sets the background color for the badge */
        function setBadgeBackgroundColor(details: {
            /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
            color: string | ColorArray,
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number
        })
        /** Gets the background color of the browser action. */
        function getBadgeBackgroundColor(details: { tabId?: number }, callback: (result: ColorArray) => any)
        /** Enables the browser action for a tab. By default, browser actions are enabled. */
        function enable(tabId?: number)
        /** Disables the browser action for a tab. */
        function disable(tabId?: number)
        /** Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup. */
        interface onClicked extends events.Event {
            addListener(calback: (tab: tabs.Tab) => any)
        }
        var onClicked: onClicked
    }
    export namespace browsingData {

    }
    export namespace certificateProvider {

    }
    export namespace commands {

    }
    export namespace contentSettings {

    }
    export namespace contextMenus {

    }
    export namespace cookies {

    }
    //export namespace debugger{
    //
    //}
    /** Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.  */
    export namespace declarativeContent {
        type PageStateMatcherInstanceType =
            "declarativeContent.PageStateMatcher"
        type ShowPageActionInstanceType =
            "declarativeContent.ShowPageAction"
        type SetIconInstanceType =
            "declarativeContent.SetIcon"
        type RequestContentScriptInstanceType =
            "declarativeContent.RequestContentScript"
        /** Matches the state of a web page by various criteria. */
        interface PageStateMatcher {
            pageUrl?: events.UrlFilter,
            css?: string[],
            isBookmarked?: boolean
        }
        class PageStateMatcher {
            constructor(psm: PageStateMatcher)
        }

        /** Declarative event action that shows the extension's page action while the corresponding conditions are met. This action can be used without host permissions, but the extension must have a page action. If the extension takes the activeTab permission, a click on the page action will grant access to the active tab. */
        var ShowPageAction
        /** Declarative event action that sets the n-dip square icon for the extension's page action or browser action while the corresponding conditions are met. This action can be used without host permissions, but the extension must have page or browser action. */
        interface SetIcon {
            imageData?: ImageData | Object
        }
        /** Declarative event action that injects a content script.
         * ***
         * WARNING: This action is still experimental and is not supported on stable builds of Chrome.
         */
        interface RequestContentScript {
            /** Names of CSS files to be injected as a part of the content script. */
            css?: string[],
            /** Names of Javascript files to be injected as a part of the content script. */
            js?: string[],
            /** Whether the content script runs in all frames of the matching page, or only the top frame. Default is false. */
            allFrames?: boolean,
            /** Whether to insert the content script on about:blank and about:srcdoc. Default is false. */
            matchAboutBlank?: boolean
        }
        var onPageChanged: events.Event
    }
    export namespace desktopCapture {

    }
    export namespace devtools {
        namespace inspectedWindow {

        }
        namespace network {

        }
        namespace panels {

        }
    }
    export namespace documentScan {

    }
    export namespace downloads {

    }
    export namespace enterprise {
        /** Use the chrome.enterprise.deviceAttributes API to read device attributes. */
        namespace deviceAttributes {

        }
        /** Use the chrome.enterprise.platformKeys API to generate hardware-backed keys and to install certificates for these keys. The certificates will be managed by the platform and can be used for TLS authentication, network access or by other extension through chrome.platformKeys. */
        namespace platformKeys {

        }
    }
    /** contains common types used by APIs dispatching events to notify you when something interesting happens. */
    export namespace events {
        /** Description of a declarative rule for handling events.*/
        interface Rule {
            /** Identifier that allows referencing this rule. */
            id?: string;
            /** Tags can be used to annotate rules and perform operations on sets of rules. */
            tags?: string[];
            /** List of conditions that can trigger the actions. */
            conditions: any[];
            /** List of actions that are triggered if one of the condtions is fulfilled. */
            actions: any[]
            /**Optional priority of this rule. Defaults to 100. */
            priority?: number;
        }
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        interface Event {
            /** Registers an event listener callback to an event. */
            addListener(callback: () => void, filter?: { url?: UrlFilter[] }): void
            /** Deregisters an event listener callback from an event. */
            removeListener(callback: (a?: any) => void): void
            hasListener(callabck: (a?: any) => void): boolean
            hasListeners(): boolean
            /** Registers rules to handle events. */
            addRules(rules: Rule[], callback?: (rules?: Rule[]) => void): void
            /** Returns currently registered rules. */
            getRules(ruleIdentifiers: string[], callback: (rules: Rule[]) => void): void
            /** Unregisters currently registered rules. */
            removeRules(ruleIdentifiers: string[], callback: () => void): void
        }
        interface UrlFilter {
            /** Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name. */
            hostContains?: string;
            /** Matches if the host name of the URL is equal to a specified string. */
            hostEquals?: string;
            /** Matches if the host name of the URL starts with a specified string. */
            hostPrefix?: string;
            /** Matches if the host name of the URL ends with a specified string. */
            hostSuffix?: string;
            /** Matches if the path segment of the URL contains a specified string. */
            pathContains?: string;
            /** Matches if the path segment of the URL is equal to a specified string. */
            pathEquals?: string;
            /** Matches if the path segment of the URL starts with a specified string. */
            pathPrefix?: string;
            /** Matches if the path segment of the URL ends with a specified string. */
            pathSuffix?: string;
            /** Matches if the query segment of the URL contains a specified string. */
            queryContains?: string;
            /** Matches if the query segment of the URL is equal to a specified string. */
            queryEquals?: string;
            /** Matches if the query segment of the URL starts with a specified string. */
            queryPrefix?: string;
            /** Matches if the query segment of the URL ends with a specified string. */
            querySuffix?: string;
            /** Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlContains?: string;
            /** Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number. */
            urlEquals?: string;
            /** Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax. */
            urlMatches?: string;
            /** Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.*/
            originAndPathMatches?: string;
            /** Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.*/
            urlPrefix?: string;
            /** Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.*/
            urlSuffix?: string;
            /** Matches if the scheme of the URL is equal to any of the schemes specified in the array.*/
            schemes?: string[];
            /** Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.*/
            ports?: number[] | number[][];
        }
    }
    /** The chrome.extension API has utilities that can be used by any extension page. It includes support for exchanging messages between an extension and its content scripts or between extensions, as described in detail in Message Passing.  */
    export namespace extension {
        /** The type of extension view. */
        type ViewType = "tab" | "popup"
        /** Set for the lifetime of a callback if an ansychronous extension api has resulted in an error. If no error has occured lastError will be undefined. */
        var lastError: { message: string };
        /** True for content scripts running inside incognito tabs, and for extension pages running inside an incognito process. The latter only applies to extensions with 'split' incognito_behavior. */
        var inIncognitoContext: boolean;
        /** Converts a relative path within an extension install directory to a fully-qualified URL. */
        function getURL(path: string): string
        /** Returns an array of the JavaScript 'window' objects for each of the pages running inside the current extension. */
        function getViews(fetchProperties?: { type?: ViewType, windowId: number, tabId: number }): void
        /** Returns the JavaScript 'window' object for the background page running inside the current extension. Returns null if the extension has no background page. */
        function getBackgroundPage(): Window
        /** Retrieves the state of the extension's access to Incognito-mode (as determined by the user-controlled 'Allowed in Incognito' checkbox. */
        function isAllowedIncognitoAccess(callback: (isAllowedAccess: boolean) => void): void
        /** Retrieves the state of the extension's access to the 'file://' scheme (as determined by the user-controlled 'Allow access to File URLs' checkbox. */
        function isAllowedFileSchemeAccess(callback: (isAllowedAccess: boolean) => void): void
        /** Sets the value of the ap CGI parameter used in the extension's update URL. This value is ignored for extensions that are hosted in the Chrome Extension Gallery. */
        function setUpdateUrlData(data: string): void;
    }
    export namespace extensionTypes {

    }
    export namespace fileBrowserHandler {

    }
    export namespace fileSystemProvider {

    }
    export namespace fontSettings {

    }
    export namespace gcm {

    }
    export namespace history {

    }
    export namespace i18n {

    }
    export namespace identity {

    }
    export namespace input {
        /** Use the chrome.input.ime API to implement a custom IME for Chrome OS. This allows your extension to handle keystrokes, set the composition, and manage the candidate window. */
        namespace ime {
            type KeyboardEventType = 'keyup' | 'keydown'
            /** See http://www.w3.org/TR/DOM-Level-3-Events/#events-KeyboardEvent */
            interface KeyboardEvent {
                /** One of keyup or keydown. */
                type: KeyboardEventType,
                /** The ID of the request. */
                requestId: string,
                /** The extension ID of the sender of this keyevent. */
                extensionId?: string,
                /** Value of the key being pressed */
                key: string,
                /** Value of the physical key being pressed. The value is not affected by current keyboard layout or modifier state. */
                code: string,
                /** The deprecated HTML keyCode, which is system- and implementation-dependent numerical code signifying the unmodified identifier associated with the key pressed. */
                keyCode?: number,
                /** Whether or not the ALT key is pressed. */
                altKey?: boolean,
                /** Whether or not the CTRL key is pressed. */
                ctrlKey?: boolean,
                /** Whether or not the SHIFT key is pressed. */
                shiftKey?: boolean,
                /** Whether or not the CAPS_LOCK is enabled. */
                capsLock?: boolean
            }
            /** Type of value this text field edits, (Text, Number, URL, etc) */
            type InputContextType = "text" | "search" | "tel" | "url" | "email" | "number" | "password"
            /** Describes an input Context */
            interface InputContext {
                /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
                contextID: number,
                /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
                type: InputContextType,
                /** This is used to specify targets of text field operations. This ID becomes invalid as soon as onBlur is called. */
                autoCorrect: boolean,
                /** Whether the text field wants auto-complete. */
                autoComplete: boolean,
                /** Whether the text field wants spell-check. */
                spellCheck: boolean
            }
            /** The type of menu item. Radio buttons between separators are considered grouped. */
            type MenuItemStyle = "check" | "radio" | "separator"
            /** A menu item used by an input method to interact with the user from the language menu. */
            interface MenuItem {
                /** String that will be passed to callbacks referencing this MenuItem. */
                id: string,
                /** Text displayed in the menu for this item. */
                label: string,
                /** The type of menu item. */
                style: MenuItemStyle,
                /** Indicates this item is visible. */
                visible: boolean,
                /** Indicates this item should be drawn with a check. */
                checked: boolean,
                /** Indicates this item is enabled. */
                enabled: boolean
            }
            /** The type of the underline to modify this segment. */
            type UnderlineStyle = "underline" | "doubleUnderline" | "noUnderline"
            /** Where to display the candidate window. If set to 'cursor', the window follows the cursor. If set to 'composition', the window is locked to the beginning of the composition. */
            type WindowPosition = "cursor" | "composition"
            /** The screen type under which the IME is activated. */
            type ScreenType = "normal" | "login" | "lock" | "secondary-login"
            type CallbackStyle = "async"
            /** Which mouse buttons was clicked. */
            type MouseButton = "left" | "middle" | "right"
            /** The IME window types. */
            type WindowType = "normal" | "followCursor"
            /** Describes the screen coordinates of a rect. */
            interface Bounds {
                /** The left of the bounds. */
                left: number,
                /** The top of the bounds. */
                top: number,
                /** The width of the bounds. */
                width: number,
                /** The height of the bounds . */
                height: number
            }
            /** The options to create an IME window */
            interface CreateWindowOptions {
                windowType: WindowType,
                url: string,
                bounds: Bounds
            }
            interface compositionParameters {
                /** ID of the context where the composition text will be set */
                contextID: number,
                /** Text to set */
                text: string,
                /** Position in the text that the selection starts at. */
                selectionStart?: number,
                /** Position in the text that the selection ends at. */
                selectionEnd?: number,
                /** Position in the text of the cursor. */
                cursor?: number,
                /** List of segments and their associated types. */
                segments?: {
                    /** Index of the character to start this segment at */
                    start: number,
                    /** Index of the character to end this segment after. */
                    end: number,
                    /** The type of the underline to modify this segment. */
                    style: UnderlineStyle
                }[]
            }
            interface candidateWindowProperties {
                /** True to show the Candidate window, false to hide it. */
                visible?: boolean,
                /** True to show the cursor, false to hide it. */
                cursorVisible?: boolean,
                /** True if the candidate window should be rendered vertical, false to make it horizontal. */
                vertical?: boolean,
                /** The number of candidates to display per page. */
                pageSize?: number,
                /** Text that is shown at the bottom of the candidate window. */
                auxiliaryText?: string,
                /** True to display the auxiliary text, false to hide it. */
                auxiliaryTextVisible?: boolean,
                /** Where to display the candidate window. */
                windowPosition?: WindowPosition
            }
            interface candidateProperties {
                /** The candidate */
                candidate: string,
                /** The candidate's id */
                id: number,
                /** The id to add these candidates under */
                parentId?: number,
                /** Short string displayed to next to the candidate, often the shortcut key or index */
                label?: string,
                /** Additional text describing the candidate */
                annotation?: string,
                /** The usage or detail description of word. */
                usage?: {
                    /** The title string of details description. */
                    title: string,
                    /** The body string of detail description. */
                    body: string
                }
            }
            /** The surrounding information. */
            interface surroundingInfo {
                /** The text around the cursor. This is only a subset of all text in the input field. */
                text: string,
                /** The ending position of the selection. This value indicates caret position if there is no selection. */
                focus: number,
                /** The beginning position of the selection. This value indicates caret position if there is no selection. */
                anchor: number,
                /** The offset position of text. Since text only includes a subset of text around the cursor, offset indicates the absolute position of the first character of text */
                offse: number
            }
            /** Set the current composition. If this extension does not own the active IME, this fails. */
            function setComposition(parameters: compositionParameters, callback?: (success: boolean) => any)
            /** Clear the current composition. If this extension does not own the active IME, this fails. */
            function clearComposition(parameters: { contextID: number }, callback?: (success: boolean) => any)
            /** Commits the provided text to the current input. */
            function commitText(parameters: { contextID: number, text: string }, callback?: (success: boolean) => any)
            /** Sends the key events. This function is expected to be used by virtual keyboards. When key(s) on a virtual keyboard is pressed by a user, this function is used to propagate that event to the system. */
            function sendKeyEvents(parameters: { contextID: number, keyData: KeyboardEvent[] }, callback?: () => any)
            /** Hides the input view window, which is popped up automatically by system. If the input view window is already hidden, this function will do nothing. */
            function hideInputView()
            /** Sets the properties of the candidate window. This fails if the extension doesn't own the active IME */
            function setCandidateWindowProperties(parameters: { engineID: string, properties: candidateWindowProperties }, callback?: (sucess: boolean) => any)
            /** Sets the current candidate list. This fails if this extension doesn't own the active IME */
            function setCandidates(parameters: { contextID: number, candidates: candidateProperties[] }, callback?: (success: boolean) => any)
            /** Set the position of the cursor in the candidate window. This is a no-op if this extension does not own the active IME. */
            function setCursorPosition(parameters: { contextID: number, candidateID: number }, callback?: (success: boolean) => any)
            /** Adds the provided menu items to the language menu when this IME is active. */
            function setMenuItems(parameters: { engineID: string, items: MenuItem[] }, callback?: () => any)
            /** Updates the state of the MenuItems specified */
            function updateMenuItems(parameters: { engineID: string, items: MenuItem[] }, callback?: () => any)
            /** Deletes the text around the caret. */
            function deleteSurroundingText(parameters: { engineID: string, contextID: number, offset: number, length: number }, callback?: () => any)
            /** Indicates that the key event received by onKeyEvent is handled. This should only be called if the onKeyEvent listener is asynchronous. */
            function keyEventHandled(requestId: string, response: boolean)
            /** Creates IME window. */
            function createWindow(options: CreateWindowOptions, callback: (windowObject: Window) => any)
            /** Shows the IME window. This makes the hidden window visible. */
            function showWindow(windowId: number, callback: () => any)
            /** Hides the IME window. This doesn't close the window. Instead, it makes the window invisible. The extension can cache the window and show/hide it for better performance. */
            function hideWindow(windowId: number, callback: () => any)
            /** Activates the IME extension so that it can receive events. */
            function activate(callback: () => any)
            /** Deactivates the IME extension so that it cannot receive events. */
            function deactivate(callback: () => any)
            /** This event is sent when an IME is activated. It signals that the IME will be receiving onKeyPress events. */
            interface onActivate extends events.Event {
                addListener(callback: (engineID: number, screen: ScreenType) => any)
            }
            var onActivate: onActivate
            /** This event is sent when an IME is deactivated. It signals that the IME will no longer be receiving onKeyPress events. */
            interface onDeactivated extends events.Event {
                addListener(callback: (engineID: string) => any)
            }
            var onDeactivated: onDeactivated
            /** This event is sent when focus enters a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
            interface onFocus extends events.Event {
                addListener(callback: (contex: InputContext) => any)
            }
            var onFocus: onFocus
            /** This event is sent when focus leaves a text box. It is sent to all extensions that are listening to this event, and enabled by the user. */
            interface onBlur extends events.Event {
                addListener(callback: (contexID: number) => any)
            }
            var onBlur: onBlur
            /** This event is sent when the properties of the current InputContext change, such as the the type. It is sent to all extensions that are listening to this event, and enabled by the user. */
            interface onInputContextUpdate extends events.Event {
                addListener(callback: (contex: InputContext) => any)
            }
            var onInputContextUpdate: onInputContextUpdate
            /** Fired when a key event is sent from the operating system. The event will be sent to the extension if this extension owns the active IME. */
            interface onKeyEvent extends events.Event {
                addListener(callback: (engineID: string, keyData: KeyboardEvent) => any)
            }
            var onKeyEvent: onKeyEvent
            /** This event is sent if this extension owns the active IME. */
            interface onCandidateClicked extends events.Event {
                addListener(callback: (engineID: string, candidateID: number, button: MouseButton) => any)
            }
            var onCandidateClicked: onCandidateClicked
            /** Called when the user selects a menu item */
            interface onMenuItemActivated extends events.Event {
                addListener(callback: (engineID: string, name: string) => any)
            }
            var onMenuItemActivated: onMenuItemActivated
            /** Called when the editable string around caret is changed or when the caret position is moved. The text length is limited to 100 characters for each back and forth direction. */
            interface onSurroundingTextChanged extends events.Event {
                addListener(callback: (engineID: string, surroundingInfo: surroundingInfo) => any)
            }
            var onSurroundingTextChanged: onSurroundingTextChanged
            /** This event is sent when chrome terminates ongoing text input session. */
            interface onReset extends events.Event {
                addListener(callback: (engineID: string) => any)
            }
            var onReset: onReset
            /** Triggered when the bounds of the IME composition text or cursor are changed. The IME composition text is the instance of text produced in the input method editor. */
            interface onCompositionBoundsChanged extends events.Event {
                addListener(callback: (boundsList: Bounds[]) => any)
            }
            var onCompositionBoundsChanged: onCompositionBoundsChanged
        }
    }
    export namespace instanceID {

    }
    export namespace management {

    }
    export namespace networking {
        namespace config {

        }
    }
    export namespace notifications {

    }
    export namespace omnibox {

    }
    /** Use the chrome.pageAction API to put icons in the main Google Chrome toolbar, to the right of the address bar. Page actions represent actions that can be taken on the current page, but that aren't applicable to all pages. Page actions appear grayed out when inactive. */
    export namespace pageAction {
        interface ImageDataType {

        }
        /** Shows the page action. The page action is shown whenever the tab is selected. */
        function show(tabId: number): void;
        /** Hides the page action. Hidden page actions still appear in the Chrome toolbar, but are grayed out. */
        function hide(tabId: number): void;
        /** Sets the title of the page action. This is displayed in a tooltip over the page action. */
        function setTitle(details: { tabId: number, title: string }): void;
        /** Gets the title of the page action. */
        function getTitle(details: { tabId: number }, callback: (result: string) => void): void;
        /** Sets the icon for the page action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified. */
        function setIcon(details: { tabId: number, imageData?: ImageDataType | Object, path?: string | Object, iconIndex?: number }, callback: () => void): void;
        /** Sets the html document to be opened as a popup when the user clicks on the page action's icon. */
        function setPopup(details: { tabId: number, popup: string }): void;
        /** Gets the html document set as the popup for this page action. */
        function getPopup(details: { tabId: number }, callback: (result: string) => void): void;
        /** Fired when a page action icon is clicked. This event will not fire if the page action has a popup. */
        interface onClicked extends events.Event {
            addListener(callback: (tab: tabs.Tab) => void): void
        }
        var onClicked: onClicked
    }
    export namespace pageCapture {

    }
    /** Use the chrome.permissions API to request declared optional permissions at run time rather than install time, so users understand why the permissions are needed and grant only those that are necessary.  */
    export namespace permissions {
        interface Permissions {
            /** List of named permissions (does not include hosts or origins). Anything listed here must appear in the optional_permissions list in the manifest. */
            permissions?: string[],
            /** List of origin permissions. Anything listed here must be a subset of a host that appears in the optional_permissions list in the manifest. For example, if http://*.example.com/ or http://* / appears in optional_permissions, you can request an origin of http://help.example.com/. Any path is ignored. */
            origins?: string[]
        }
        /** Gets the extension's current set of permissions. */
        function getAll(callback: (permissions: Permissions) => any)
        /** Checks if the extension has the specified permissions. */
        function contains(callback: (result: boolean) => any)
        /** Requests access to the specified permissions. These permissions must be defined in the optional_permissions field of the manifest. If there are any problems requesting the permissions, runtime.lastError will be set. */
        function request(permissions: Permissions, callback?: (granted: boolean) => any)
        /** Removes access to the specified permissions. If there are any problems removing the permissions, runtime.lastError will be set. */
        function remove(permissions: Permissions, callback?: (removed: boolean) => any)
        /** Fired when the extension acquires new permissions. */
        interface onAdded extends events.Event {
            addListener(callback: (permissions: Permissions) => any)
        }
        var onAdded: onAdded
        /** Fired when access to permissions has been removed from the extension. */
        interface onRemoved extends events.Event {
            addListener(callback: (permissions: Permissions) => any)
        }
        var onRemoved: onRemoved
    }
    export namespace platformKeys {

    }
    export namespace power {

    }
    export namespace printerProvider {

    }
    export namespace privacy {

    }
    export namespace proxy {

    }
    /**  Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs. */
    export namespace runtime {
        /** An object which allows two way communication with other pages. See Long-lived connections for more information. */
        interface Port {
            /** The name of the port, as specified in the call to runtime.connect. */
            name: string,
            /** Immediately disconnect the port. Calling disconnect() on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port. */
            disconnect: () => void,
            /** Fired when the port is disconnected from the other end(s). runtime.lastError may be set if the port was disconnected by an error. If the port is closed via disconnect, then this event is only fired on the other end. This event is fired at most once (see also Port lifetime). The first and only parameter to the event handler is this disconnected port. */
            onDisconnect: events.Event,
            /** This event is fired when postMessage is called by the other end of the port. The first parameter is the message, the second parameter is the port that received the message. */
            onMessage: events.Event,
            /** Send a message to the other end of the port. If the port is disconnected, an error is thrown. */
            postMessage: (message) => void,
            /** This property will only be present on ports passed to onConnect / onConnectExternal listeners. */
            sender?: MessageSender
        }
        /** An object containing information about the script context that sent a message or request. */
        interface MessageSender {
            /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
            tab?: tabs.Tab,
            /** The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set. */
            frameId: number,
            /** The ID of the extension or app that opened the connection, if any. */
            id: string,
            /** The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it. */
            url: string,
            /** The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available. */
            tlsChannelId: string
        }
        /** The operating system chrome is running on. */
        type PlatformOs =
            "mac" |
            "win" |
            "android" |
            "cros" |
            "linux" |
            "openbsd"
        /** The machine's processor architecture. */
        type PlatformArch =
            "arm" |
            "x86-32" |
            "x86-64"
        /** The native client architecture. This may be different from arch on some platforms. */
        type PlatformNaclArch =
            "arm" |
            "x86-32" |
            "x86-64"
        /** An object containing information about the current platform. */
        interface PlatformInfo {
            os: PlatformOs,
            arch: PlatformArch,
            nacl_arch: PlatformNaclArch
        }
        /** Result of the update check. */
        type RequestUpdateCheckStatus =
            "throttled" |
            "no_update" |
            "update_available"
        /** The reason that this event is being dispatched. */
        type OnInstalledReason =
            "install" |
            "update" |
            "chrome_update" |
            "shared_module_update"
        /** The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy. */
        type OnRestartRequiredReason =
            "app_update" |
            "os_update" |
            "periodic"


        /** Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode. */
        var onStartup: events.Event
        /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
        interface onInstalled extends events.Event {
            addListener(callback: (details: { reason: OnInstalledReason, previousVersion: string, id: string }) => void)
        }
        var onInstalled: onInstalled
        /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
        var onSuspend: events.Event
        /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
        var onSuspendCanceled: events.Event
        /** Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event. */
        interface onUpdateAvailable extends events.Event {
            addListener(callback: (details: { version: string }) => void): void
        }
        /** Fired when a connection is made from either an extension process or a content script (by runtime.connect). */
        interface onConnect extends events.Event {
            addListener(callback: (port: Port) => void): void
        }
        var onConnect: onConnect
        /** Fired when a connection is made from another extension (by runtime.connect). */
        interface onConnectExternal extends events.Event {
            addListener(callback: (port: Port) => void): void
        }
        var onConnectExternal: onConnectExternal
        /** Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script (by tabs.sendMessage). */
        interface onMessage extends events.Event {
            addListener(callback: (message, sender: MessageSender, sendResponse: (response: Object | true) => void) => void): void
        }
        var onMessage: onMessage
        /** Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script. */
        var onMessageExternal: onMessage
        /**  */
        interface onRestartRequired extends events.Event {
            addListener(callback: (reason: OnRestartRequiredReason) => void): void
        }
        var onRestartRequired: onRestartRequired


        /** This will be defined during an API method callback if there was an error */
        var lastError: { message?: string }
        /** The ID of the extension/app. */
        var id: string


        /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
        function getBackgroundPage(callback: (backgroundPage?: Window) => void): void
        /** Open your Extension's options page, if possible.
         * ***
         * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload. */
        function openOptionsPage(callback?: () => void): void
        /** Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file. */
        function getManifest(): Object
        /** Converts a relative path within an app/extension install directory to a fully-qualified URL. */
        function getURL(path: String): String
        /** Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters. */
        function setUninstallURL(url: String, callback?: () => void): void
        /** Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use chrome.runtime.restart() method. */
        function reload(): void
        /** Requests an immediate update check be done for this app/extension.
         * ***
         * Important: Most extensions/apps should not use this method, since chrome already does automatic checks every few hours, and you can listen for the runtime.onUpdateAvailable event without needing to call requestUpdateCheck. */
        function requestUpdateCheck(callback: (status: RequestUpdateCheckStatus, details?: { version: string }) => void): void
        /** Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op. */
        function restart(): void
        /** Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of -1, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API. */
        function restartAfterDelay(seconds: number, callback?: () => void): void
        /** Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect. */
        function connect(extensionId?: String, connectInfo?: { name?: string, includeTlsChannelId?: boolean }): Port
        /** Connects to a native application in the host machine. See Native Messaging for more information */
        function connectNative(application: string): Port
        /** Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in every frame of your extension (except for the sender's frame), or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage. */
        function sendMessage(extensionId: string, message, options: { includeTlsChannelId?: boolean }, responseCallback?: (response) => void): void
        /** Send a single message to a native application. */
        function sendNativeMessage(application: string, message: Object, responseCallback?: (response) => void): void
        /** Returns information about the current platform. */
        function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void
        /** Returns a DirectoryEntry for the package directory. */
        function getPackageDirectoryEntry(callback: (directoryEntry: Object) => void): void

    }
    export namespace sessions {

    }
    /** Use the chrome.storage API to store, retrieve, and track changes to user data. */
    export namespace storage {
        interface StorageChange {
            /** The old value of the item, if there was an old value. */
            oldValue?: any,
            /** The new value of the item, if there is a new value. */
            newValue?: any
        }
        interface StorageArea {
            /** Gets one or more items from storage. */
            get(keys: string | string[] | Object | null, callback: (items: Object) => any),
            /** Gets the amount of space (in bytes) being used by one or more items. */
            getBytesInUse(keys: string | string[], callback: (bytesInUse: number) => any),
            /** Sets multiple items. */
            set(items: any, callback?: () => any),
            /** Removes one or more items from storage. */
            remove(keys: string | string[], callback?: () => any),
            /** Removes all items from storage. */
            clear(callback?: () => any)
        }
        /** Items in the sync storage area are synced using Chrome Sync. */
        var sync: StorageArea;
        /** Items in the local storage area are local to each machine. */
        var local: StorageArea;
        /** Items in the managed storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error. */
        var managed: StorageArea;
        /** Fired when one or more items change. */
        interface onChanged extends events.Event {
            addListener(callback: (changes: Object, areaName: 'sync' | 'local' | 'managed') => any)
        }
        var onChanged: onChanged
    }
    export namespace system {
        /** Use the system.cpu API to query CPU metadata.  */
        namespace cpu {
            /** Queries basic CPU information of the system. */
            function getInfo(callback: (info: {
                /** The number of logical processors. */
                numOfProcessors: number,
                /** The architecture name of the processors. */
                archName: string,
                /** The model name of the processors. */
                modelName: string,
                /** A set of feature codes indicating some of the processor's capabilities. The currently supported codes are "mmx", "sse", "sse2", "sse3", "ssse3", "sse4_1", "sse4_2", and "avx". */
                features: string[],
                /** Information about each logical processor. */
                processors: {
                    /** Cumulative usage info for this logical processor. */
                    usage: {
                        /** The cumulative time used by userspace programs on this processor. */
                        user: number,
                        /** The cumulative time used by kernel programs on this processor. */
                        kernel: number,
                        /** The cumulative time spent idle by this processor. */
                        idle: number,
                        /** The total cumulative time for this processor. This value is equal to user + kernel + idle. */
                        total: number
                    }
                }[]
            }) => any)
        }
        /** The chrome.system.memory API. */
        namespace memory {
            /** Get physical memory information. */
            function getInfo(callback: (info: {
                /** The total amount of physical memory capacity, in bytes. */
                capacity: number,
                /** The amount of available capacity, in bytes. */
                availableCapacity: number
            }) => any)
        }
        /** Use the chrome.system.storage API to query storage device information and be notified when a removable storage device is attached and detached. */
        namespace storage {
            interface StorageUnitInfo {
                /** The transient ID that uniquely identifies the storage device. This ID will be persistent within the same run of a single application. It will not be a persistent identifier between different runs of an application, or between different applications. */
                id: string,
                /** The name of the storage unit. */
                name: string,
                /** The media type of the storage unit. */
                type: "fixed" | "removable" | "unknown",
                /** The total amount of the storage space, in bytes. */
                capacity: number
            }
            /** Get the storage information from the system. The argument passed to the callback is an array of StorageUnitInfo objects. */
            function getInfo(callback: (info: StorageUnitInfo[]) => any)
            /** Ejects a removable storage device. */
            function ejectDevice(id: string, callback: (result: "success" | "in_use" | "no_such_device" | "failure") => any)
            /** Fired when a new removable storage is attached to the system. */
            interface onAttached extends events.Event {
                addListener(callback: (info: StorageUnitInfo) => any)
            }
            var onAttached: onAttached
            /** Fired when a removable storage is detached from the system. */
            interface onDetached extends events.Event {
                addListener(callback: (id: string) => any)
            }
            var onDetached: onDetached
        }
    }
    export namespace tabCapture {

    }
    /** Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser. */
    export namespace tabs {
        /** An event that caused a muted state change. */
        type MutedInfoReason =
            "user" |
            "capture" |
            "extension"
        /** Tab muted state and the reason for the last state change. */
        interface MutedInfo {
            /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
            muted: boolean,
            /** The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed. */
            reason?: MutedInfoReason
            /** The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed. */
            extensionId?: string
        }
        interface Tab {
            /** The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows. */
            id?: number,
            /** The zero-based index of the tab within its window. */
            index: number,
            /** The ID of the window the tab is contained within. */
            windowId: number,
            /** The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists. */
            openerTabId?: number,
            /** Whether the tab is highlighted. */
            highlighted: boolean,
            /** Whether the tab is active in its window. (Does not necessarily mean the window is focused.) */
            active: boolean,
            /** Whether the tab is pinned. */
            pinned: boolean,
            /** Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing. */
            audible?: boolean,
            /** Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated. */
            discarded: boolean,
            /** Whether the tab can be discarded automatically by the browser when resources are low. */
            autoDiscardable: boolean,
            /** Current tab muted state and the reason for the last state change. */
            mutedInfo?: MutedInfo,
            /** The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission. */
            url?: string,
            /** The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission. */
            title?: string,
            /** The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading. */
            favIconUrl?: string,
            /** Either loading or complete. */
            status?: string,
            /** Whether the tab is in an incognito window. */
            incognito: boolean,
            /** The width of the tab in pixels. */
            width?: number,
            /** The height of the tab in pixels. */
            height?: number,
            /** The session ID used to uniquely identify a Tab obtained from the sessions API. */
            sessionId?: string
        }
        /** Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to automatic. */
        type ZoomSettingsMode =
            "automatic" |
            "manual" |
            "disabled"
        /** Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise. */
        type ZoomSettingsScope =
            "per-origin" |
            "per-tab"
        /** Defines how zoom changes in a tab are handled and at what scope. */
        interface ZoomSettings {
            /** Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to automatic. */
            mode?: ZoomSettingsMode,
            /** Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise. */
            scope?: ZoomSettingsScope,
            /** Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings. */
            defaultZoomFactor?: number
        }
        /** Whether the tabs have completed loading. */
        type TabStatus =
            "loading" |
            "complete"
        /** The type of window. */
        type WindowType =
            "normal" |
            "popup" |
            "panel" |
            "app" |
            "devtools"
        /** An ID which represents the absence of a browser tab. */
        const TAB_ID_NONE = -1
        /** Retrieves details about the specified tab. */
        function get(tabId: number, callback: (tab: Tab) => void): void
        /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
        function getCurrent(callback: (tab: Tab) => void): void
        /** Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. For more details, see Content Script Messaging. */
        function connect(tabId: number, connectInfo?: { name?: string, frameId: number }): void
        /** Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension. */
        function sendMessage(tabId: number, message, options?: { frameId?: number }, responseCallback?: (response) => void): void;
        interface createProperties {
            /** The window to create the new tab in. Defaults to the current window. */
            windowId?: number,
            /** The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
            index?: number,
            /** The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page. */
            url?: string,
            /** Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true. */
            active?: boolean,
            /** Whether the tab should be pinned. Defaults to false */
            pinned?: boolean,
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab. */
            openerTabId?: number
        }
        /** Creates a new tab. */
        function create(createProperties: createProperties, callback?: (tab: Tab) => void): void
        /** Duplicates a tab. */
        function duplicate(tabId: number, callback?: (tab: Tab) => void): void;
        interface queryInfo {
            /** Whether the tabs are active in their windows. */
            active?: boolean,
            /** Whether the tabs are pinned. */
            pinned?: boolean,
            /** Whether the tabs are audible. */
            audible?: boolean,
            /** Whether the tabs are muted. */
            muted?: boolean,
            /** Whether the tabs are highlighted. */
            highlighted?: boolean,
            /** Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated. */
            discarded?: boolean,
            /** Whether the tabs can be discarded automatically by the browser when resources are low. */
            autoDiscardable?: boolean,
            /** Whether the tabs are in the current window. */
            currentWindow?: boolean,
            /** Whether the tabs are in the last focused window. */
            lastFocusedWindow?: boolean,
            /** Whether the tabs have completed loading. */
            status?: TabStatus,
            /** Match page titles against a pattern. Note that this property is ignored if the extension doesn't have the "tabs" permission. */
            title?: string,
            /** Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. Note that this property is ignored if the extension doesn't have the "tabs" permission. */
            url?: string | string[],
            /** The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
            windowId?: number,
            /** The type of window the tabs are in. */
            windowType?: WindowType,
            /** The position of the tabs within their windows. */
            index?: number
        }
        /** Gets all tabs that have the specified properties, or all tabs if no properties are specified. */
        function query(queryInfo: queryInfo, callback: (result: Tab[]) => void): void
        /** Highlights the given tabs. */
        function highlight(highlightInfo: { windowId?: number, tabs: number | number[] }, callback?: (window: windows.Window) => void): void;
        interface updateProperties {
            /** A URL to navigate the tab to. */
            url?: string,
            /** Whether the tab should be active. Does not affect whether the window is focused (see windows.update). */
            active?: boolean,
            /** Adds or removes the tab from the current selection. */
            highlighted?: boolean,
            /** Whether the tab should be pinned. */
            pinned?: boolean,
            /** Whether the tab should be muted. */
            muted?: boolean,
            /** The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab. */
            openerTabId?: number,
            /** Whether the tab should be discarded automatically by the browser when resources are low. */
            autoDiscardable?: boolean
        }
        /** Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified. */
        function update(tabId: number, updateProperties: updateProperties, callback?: (tab: Tab) => void): void
        /** Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows. */
        function move(tabIds: number | number[], moveProperties: { windowId?: number, index: number }, callback?: (tabs: Tab | Tab[]) => void): void
        /** Reload a tab */
        function reload(tabId?: number, reloadProperties?: { bypassCache?: boolean }, callback?: () => void): void
        /** Closes one or more tabs. */
        function remove(tabIds: number | number[], callback?: () => void): void
        /** Detects the primary language of the content in a tab. */
        function detectLanguage(tabId: number, callback: (language: string) => void): void
        /** Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method. */
        function captureVisibleTab(windowId: number, options: { format?: "jpeg" | "png", quality?: number }, callback: (dataUrl: string) => void): void;
        interface scriptDetails {
            /** JavaScript or CSS code to inject. 
             * ***
             * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
            */
            code?: string,
            /** JavaScript or CSS file to inject. */
            file?: string,
            /** If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame. If true and frameId is set, then the code is inserted in the selected frame and all of its child frames. */
            allFrames?: boolean,
            /** The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame). */
            frameId?: number,
            /** If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false. */
            matchAboutBlank?: boolean,
            /** The soonest that the JavaScript or CSS will be injected into the tab. Defaults to "document_idle". */
            runAt?: "document_start" | "document_end" | "document_idle"
        }
        /** Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc. */
        function executeScript(tabId: number, details: scriptDetails, callback?: (result: any[]) => void): void
        /** Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc. */
        function insertCSS(tabId: number, details: scriptDetails, callback?: () => void): void
        /** Zooms a specified tab. */
        function setZoom(tabId: number, zoomFactor: number, callback?: () => void): void
        /** Gets the current zoom factor of a specified tab. */
        function getZoom(tabId: number, callback: (zoomFactor: number) => void): void
        /** Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab. */
        function setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback?: () => void): void
        /** Gets the current zoom settings of a specified tab. */
        function getZoomSettings(tabId: number, callback: (zoomSettings: ZoomSettings) => void): void
        /** Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated. */
        function discard(tabId?: number, callback?: (tab: Tab) => void): void;
        /** Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
        interface onCreated extends events.Event {
            addListener(callback: (tab: Tab) => void): void
        }
        var onCreated: onCreated
        interface changeInfo {
            /** The status of the tab. Can be either loading or complete. */
            status?: "loading" | "complete",
            /** The tab's URL if it has changed. */
            url?: string,
            /** The tab's new pinned state. */
            pinned?: boolean,
            /** The tab's new audible state. */
            audible?: boolean,
            /** The tab's new discarded state. */
            discarded?: boolean,
            /** The tab's new auto-discardable state. */
            autoDiscardable?: boolean,
            /** The tab's new muted state and the reason for the change. */
            mutedInfo?: MutedInfo,
            /** The tab's new favicon URL. */
            favIconUrl?: string,
            /** The tab's new title. */
            title?: string
        }
        /** Fired when a tab is updated. */
        interface onUpdated extends events.Event {
            addListener(callback: (tabId: number, changeInfo: changeInfo, tab: Tab) => void): void
        }
        var onUpdated: onUpdated
        /** Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see tabs.onDetached. */
        interface onMoved {
            addListener(callback: (tabId: number, moveInfo: { windowId: number, fromIndex: number, toIndex: number }) => void): void
        }
        var onMoved: onMoved
        /** Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
        interface onActivated extends events.Event {
            addListener(callback: (activeInfo: { tabId: number, windowId: number }) => void): void
        }
        var onActivated: onActivated
        /** Fired when the highlighted or selected tabs in a window changes. */
        interface onHighlighted extends events.Event {
            addListener(callback: (highlightInfo: { windowId: number, tabIds: number[] }) => void): void
        }
        var onHighlighted: onHighlighted
        /** Fired when a tab is detached from a window, for example because it is being moved between windows. */
        interface onDetached extends events.Event {
            addListener(callback: (tabId: number, detachInfo: { oldWindowId: number, oldPosition: number }) => void): void
        }
        var onDetached: onDetached
        /** Fired when a tab is attached to a window, for example because it was moved between windows. */
        interface onAttached extends events.Event {
            addListener(callback: (tabId: number, attachInfo: { newWindowId: number, newPosition: number }) => void): void
        }
        var onAttached: onAttached
        /** Fired when a tab is closed. */
        interface onRemoved extends events.Event {
            addListener(callback: (tabId: number, removeInfo: { windowId: number, isWindowClosing: boolean }) => void): void
        }
        var onRemoved: onRemoved
        /** Fired when a tab is replaced with another tab due to prerendering or instant. */
        interface onReplaced extends events.Event {
            addListener(callback: (addedTabId: number, removedTabId: number) => void): void
        }
        var onReplaced: onReplaced
        /** Fired when a tab is zoomed. */
        interface onZoomChange extends events.Event {
            addListener(callback: (ZoomChangeInfo: { tabId: number, oldZoomFactor: number, newZoomFactor: number, zoomSettings: ZoomSettings }) => void): void
        }
        var onZoomChange: onZoomChange
    }
    export namespace topSites {

    }
    export namespace tts {

    }
    export namespace ttsEngine {

    }
    export namespace types {

    }
    export namespace vpnProvider {

    }
    export namespace wallpaper {

    }
    export namespace webNavigation {

    }
    /** Use the chrome.webRequest API to observe and analyze traffic and to intercept, block, or modify requests in-flight. */
    export namespace webRequest {
        type ResourceType = "main_frame" | "sub_frame" | "stylesheet" | "script" | "image" | "font" | "object" | "xmlhttprequest" | "ping" | "other"
        type OnBeforeRequestOptions = "blocking" | "requestBody"
        type OnBeforeSendHeadersOptions = "requestHeaders" | "blocking"
        type OnSendHeadersOptions = "requestHeaders"
        type OnHeadersReceivedOptions = "blocking" | "responseHeaders"
        type OnAuthRequiredOptions = "responseHeaders" | "blocking" | "asyncBlocking"
        type OnResponseStartedOptions = "responseHeaders"
        type OnBeforeRedirectOptions = "responseHeaders"
        type OnCompletedOptions = "responseHeaders"
        /** An object describing filters to apply to webRequest events. */
        interface RequestFilter {
            /** A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out. */
            urls: string[]
            /** A list of request types. Requests that cannot match any of the types will be filtered out. */
            types?: ResourceType[]
            tabId?: number
            windowId?: number
        }
        type HttpHeaders = ({ name: string } & ({ value: string } | { binaryValue: number[] }))[]
        interface BlockingResponse {
            /** If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent. */
            cancel?: boolean,
            /** Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as data: are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method. */
            redirectUrl?: string,
            /** Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead. */
            requestHeaders?: HttpHeaders,
            /** Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return responseHeaders if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify responseHeaders for each request). */
            responseHeaders?: HttpHeaders,
            /** Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials. */
            authCredentials?: { username: string, password: string }
        }
        interface UploadData {
            /** An ArrayBuffer with a copy of the data. */
            bytes?: any,
            /** A string with the file's path and name. */
            file?: string
        }
        /** The maximum number of times that handlerBehaviorChanged can be called per 10 minute sustained interval. handlerBehaviorChanged is an expensive function call that shouldn't be called often. */
        const MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES = 20
        /** Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often. */
        function handlerBehaviorChanged(callback?: () => any)
        interface requestDetails {
            /** The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request. */
            requestId: string,
            url: string,
            /** Standard HTTP method. */
            method: string,
            /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab */
            frameId: number,
            /** ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists. */
            parentFrameId: number,
            /** The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab. */
            tabId: number,
            /** How the requested resource will be used. */
            type: ResourceType,
            /** The time when this signal is triggered, in milliseconds since the epoch. */
            timeStamp: number
        }
        interface beforeRequest extends requestDetails {
            /** Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'. */
            requestBody?: {
                /** Errors when obtaining request body data. */
                error?: string,
                /** If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. 
                 * 
                 * An example value of this dictionary is {'key': ['value1', 'value2']}. */
                formData?: { [key: string]: [string, string] },
                /** If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array. */
                raw?: UploadData[]
            }
        }
        /** Fired when a request is about to occur. */
        interface onBeforeRequest extends events.Event {
            addListener(callback: (details: beforeRequest) => BlockingResponse, filter: RequestFilter, options: ['blocking'])
            addListener(callback: (details: beforeRequest) => any, filter: RequestFilter, options?: OnBeforeRequestOptions[])
        }
        var onBeforeRequest: onBeforeRequest
        interface sendHeaders extends requestDetails {
            requestHeaders?: HttpHeaders
        }
        /** Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. */
        interface onBeforeSendHeaders extends events.Event {
            addListener(callback: (details: sendHeaders) => any, filter: RequestFilter, options?: OnBeforeSendHeadersOptions[])
        }
        var onBeforeSendHeaders: onBeforeSendHeaders
        /** Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired). */
        interface onSendHeaders extends events.Event {
            addListener(callback: (details: sendHeaders) => any, filter: RequestFilter, options?: OnSendHeadersOptions[])
        }
        var onSendHeaders: onSendHeaders
        interface headersRecieved extends requestDetails {
            /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line). */
            statusLine: string,
            /** The HTTP response headers that have been received with this response. */
            responseHeaders?: HttpHeaders,
            /** Standard HTTP status code returned by the server. */
            statusCode: number
        }
        /** Fired when HTTP response headers of a request have been received. */
        interface onHeadersReceived extends events.Event {
            addListener(callback: (details: headersRecieved) => BlockingResponse, filter: RequestFilter, options?: ['blocking'])
            addListener(callback: (details: headersRecieved) => any, filter: RequestFilter, options?: OnHeadersReceivedOptions[])
        }
        var onHeadersReceived: onHeadersReceived
        interface authRequired extends headersRecieved {
            /** The authentication scheme, e.g. Basic or Digest. */
            scheme: string,
            /** The authentication realm provided by the server, if there is one. */
            realm?: string,
            /** The server requesting authentication. */
            challenger: { host: string, port: number },
            /** True for Proxy-Authenticate, false for WWW-Authenticate. */
            isProxy: boolean,
        }
        /** Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request. */
        interface onAuthRequired extends events.Event {
            addListener(callback: (details: authRequired, callback?: (response: BlockingResponse) => any) => any, filter: RequestFilter, options?: OnAuthRequiredOptions[])
        }
        var onAuthRequired: onAuthRequired
        interface responseStarted extends headersRecieved {
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string,
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean,
        }
        /** Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available. */
        interface onResponseStarted extends events.Event {
            addListener(callback: (details: responseStarted) => any, filter: RequestFilter, options?: OnResponseStartedOptions[])
        }
        var onResponseStarted: onResponseStarted
        interface beforeRedirect extends responseStarted {
            /** The new URL. */
            redirectUrl: string,
        }
        /** Fired when a server-initiated redirect is about to occur. */
        interface onBeforeRedirect extends events.Event {
            addListener(callback: (details: beforeRedirect) => any, filter: RequestFilter, options?: OnBeforeRedirectOptions[])
        }
        var onBeforeRedirect: onBeforeRedirect
        /** Fired when a request is completed. */
        interface onCompleted extends events.Event {
            addListener(callback: (details: responseStarted) => any, filter: RequestFilter, options?: OnCompletedOptions[])
        }
        var onCompleted: onCompleted
        interface errorOccured extends requestDetails {
            /** The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address. */
            ip?: string,
            /** Indicates if this response was fetched from disk cache. */
            fromCache: boolean,
            /** The error description. This string is not guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content. */
            error: string
        }
        interface onErrorOccurred extends events.Event {
            addListener(callback: (details: errorOccured) => any, filter: RequestFilter)
        }
        var onErrorOccurred: onErrorOccurred
    }
    export namespace webstore {

    }
    /** Use the chrome.windows API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser. */
    export namespace windows {
        /** The type of browser window this is. Under some circumstances a Window may not be assigned type property, for example when querying closed windows from the sessions API. */
        type WindowType = "normal" | "popup" | "panel" | "app" | "devtools"
        /** The state of this browser window. Under some circumstances a Window may not be assigned state property, for example when querying closed windows from the sessions API. */
        type WindowState = "normal" | "minimized" | "maximized" | "fullscreen" | "docked"
        interface location {
            /** Whether the window is currently the focused window. */
            focused: boolean,
            /** The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the sessions API. */
            top?: number,
            /** The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the sessions API. */
            left?: number,
            /** The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the sessions API. */
            width?: number,
            /** The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the sessions API. */
            height?: number,
        }
        interface Window extends location {
            /** The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the sessions API, in which case a session ID may be present. */
            id?: number,
            /** Array of tabs.Tab objects representing the current tabs in the window. */
            tabs?: tabs.Tab[],
            /** Whether the window is incognito. */
            incognito: boolean,
            /** The type of browser window this is. */
            type?: WindowType
            /** The state of this browser window. */
            state?: WindowState,
            /** Whether the window is set to be always on top. */
            alwaysOnTop: boolean,
            /** The session ID used to uniquely identify a Window obtained from the sessions API. */
            sessionId?: string
        }
        interface getInfo {
            /** If true, the windows.Window object will have a tabs property that contains a list of the tabs.Tab objects. The Tab objects only contain the url, title and favIconUrl properties if the extension's manifest file includes the "tabs" permission. */
            populate: boolean,
            /** If set, the windows.Window returned will be filtered based on its type. If unset the default filter is set to ['app', 'normal', 'panel', 'popup'], with 'app' and 'panel' window types limited to the extension's own windows. */
            windowTypes: WindowType[]
        }
        interface createData extends location {
            /** A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page. */
            url?: string | string[],
            /** The id of the tab for which you want to adopt to the new window. */
            tabId?: number,
            /** Whether the new window should be an incognito window. */
            incognito?: boolean,
            /** Specifies what type of browser window to create. */
            type?: CreateType,
            /** The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. */
            state?: WindowState
        }
        interface updateInfo extends location {
            /** If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request. */
            drawAttention: boolean,
            /** The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'. */
            state?: WindowState
        }
        /** Specifies what type of browser window to create. 'panel' is deprecated and only available to existing whitelisted extensions on Chrome OS. */
        type CreateType = "normal" | "popup" | "panel"
        /** The windowId value that represents the absence of a chrome browser window. */
        const WINDOW_ID_NONE = -1
        /** The windowId value that represents the current window. */
        const WINDOW_ID_CURRENT = -2
        /** Gets details about a window. */
        function get(windowId: number, getInfo: getInfo, callback: (window: Window) => any)
        /** Gets the current window. */
        function getCurrent(getInfo: getInfo, callback: (window: Window) => any)
        /** Gets the window that was most recently focused — typically the window 'on top'. */
        function getLastFocused(getInfo: getInfo, callback: (window: Window) => any)
        /** Gets all windows. */
        function getAll(getInfo: getInfo, callback: (window: Window[]) => any)
        /** Creates (opens) a new browser with any optional sizing, position or default URL provided. */
        function create(createData: createData, callback?: (window: Window) => any)
        /** Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged. */
        function update(windowId: number, updateInfo: updateInfo, callback?: (window: Window) => any)
        /** Removes (closes) a window, and all the tabs inside it. */
        function remove(windowId: number, callback?: () => any)
        /** Fired when a window is created. */
        interface onCreated extends events.Event {
            addListener(callback: (window: Window) => any, filter: WindowType[])
        }
        var onCreated: onCreated
        /** Fired when a window is removed (closed). */
        interface onRemoved extends events.Event {
            addListener(callback: (windowId: number) => any, filter: WindowType[])
        }
        var onRemoved: onRemoved
        /** Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus. Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one chrome window to another. */
        interface onFocusChanged extends events.Event {
            addListener(callback: (windowId: number) => any, filter: WindowType[])
        }
        var onFocusChanged: onFocusChanged
    }
}