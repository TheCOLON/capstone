"use strict";

/**
 * TinyMCE version 6.1.2 (2022-07-29)
 */
(function () {
  'use strict';

  var global$2 = tinymce.util.Tools.resolve('tinymce.PluginManager');
  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');
  var global = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var option = function option(name) {
    return function (editor) {
      return editor.options.get(name);
    };
  };

  var register$2 = function register$2(editor) {
    var registerOption = editor.options.register;
    registerOption('allow_html_in_named_anchor', {
      processor: 'boolean',
      "default": false
    });
  };

  var allowHtmlInNamedAnchor = option('allow_html_in_named_anchor');
  var namedAnchorSelector = 'a:not([href])';

  var isEmptyString = function isEmptyString(str) {
    return !str;
  };

  var getIdFromAnchor = function getIdFromAnchor(elm) {
    var id = elm.getAttribute('id') || elm.getAttribute('name');
    return id || '';
  };

  var isAnchor = function isAnchor(elm) {
    return elm && elm.nodeName.toLowerCase() === 'a';
  };

  var isNamedAnchor = function isNamedAnchor(elm) {
    return isAnchor(elm) && !elm.getAttribute('href') && getIdFromAnchor(elm) !== '';
  };

  var isEmptyNamedAnchor = function isEmptyNamedAnchor(elm) {
    return isNamedAnchor(elm) && !elm.firstChild;
  };

  var removeEmptyNamedAnchorsInSelection = function removeEmptyNamedAnchorsInSelection(editor) {
    var dom = editor.dom;
    global$1(dom).walk(editor.selection.getRng(), function (nodes) {
      global.each(nodes, function (node) {
        if (isEmptyNamedAnchor(node)) {
          dom.remove(node, false);
        }
      });
    });
  };

  var isValidId = function isValidId(id) {
    return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
  };

  var getNamedAnchor = function getNamedAnchor(editor) {
    return editor.dom.getParent(editor.selection.getStart(), namedAnchorSelector);
  };

  var getId = function getId(editor) {
    var anchor = getNamedAnchor(editor);

    if (anchor) {
      return getIdFromAnchor(anchor);
    } else {
      return '';
    }
  };

  var createAnchor = function createAnchor(editor, id) {
    editor.undoManager.transact(function () {
      if (!allowHtmlInNamedAnchor(editor)) {
        editor.selection.collapse(true);
      }

      if (editor.selection.isCollapsed()) {
        editor.insertContent(editor.dom.createHTML('a', {
          id: id
        }));
      } else {
        removeEmptyNamedAnchorsInSelection(editor);
        editor.formatter.remove('namedAnchor', null, null, true);
        editor.formatter.apply('namedAnchor', {
          value: id
        });
        editor.addVisual();
      }
    });
  };

  var updateAnchor = function updateAnchor(editor, id, anchorElement) {
    anchorElement.removeAttribute('name');
    anchorElement.id = id;
    editor.addVisual();
    editor.undoManager.add();
  };

  var insert = function insert(editor, id) {
    var anchor = getNamedAnchor(editor);

    if (anchor) {
      updateAnchor(editor, id, anchor);
    } else {
      createAnchor(editor, id);
    }

    editor.focus();
  };

  var insertAnchor = function insertAnchor(editor, newId) {
    if (!isValidId(newId)) {
      editor.windowManager.alert('ID should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
      return false;
    } else {
      insert(editor, newId);
      return true;
    }
  };

  var open = function open(editor) {
    var currentId = getId(editor);
    editor.windowManager.open({
      title: 'Anchor',
      size: 'normal',
      body: {
        type: 'panel',
        items: [{
          name: 'id',
          type: 'input',
          label: 'ID',
          placeholder: 'example'
        }]
      },
      buttons: [{
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      }, {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }],
      initialData: {
        id: currentId
      },
      onSubmit: function onSubmit(api) {
        if (insertAnchor(editor, api.getData().id)) {
          api.close();
        }
      }
    });
  };

  var register$1 = function register$1(editor) {
    editor.addCommand('mceAnchor', function () {
      open(editor);
    });
  };

  var isNamedAnchorNode = function isNamedAnchorNode(node) {
    return node && isEmptyString(node.attr('href')) && !isEmptyString(node.attr('id') || node.attr('name'));
  };

  var isEmptyNamedAnchorNode = function isEmptyNamedAnchorNode(node) {
    return isNamedAnchorNode(node) && !node.firstChild;
  };

  var setContentEditable = function setContentEditable(state) {
    return function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        if (isEmptyNamedAnchorNode(node)) {
          node.attr('contenteditable', state);
        }
      }
    };
  };

  var setup = function setup(editor) {
    editor.on('PreInit', function () {
      editor.parser.addNodeFilter('a', setContentEditable('false'));
      editor.serializer.addNodeFilter('a', setContentEditable(null));
    });
  };

  var registerFormats = function registerFormats(editor) {
    editor.formatter.register('namedAnchor', {
      inline: 'a',
      selector: namedAnchorSelector,
      remove: 'all',
      split: true,
      deep: true,
      attributes: {
        id: '%value'
      },
      onmatch: function onmatch(node, _fmt, _itemName) {
        return isNamedAnchor(node);
      }
    });
  };

  var register = function register(editor) {
    editor.ui.registry.addToggleButton('anchor', {
      icon: 'bookmark',
      tooltip: 'Anchor',
      onAction: function onAction() {
        return editor.execCommand('mceAnchor');
      },
      onSetup: function onSetup(buttonApi) {
        return editor.selection.selectorChangedWithUnbind('a:not([href])', buttonApi.setActive).unbind;
      }
    });
    editor.ui.registry.addMenuItem('anchor', {
      icon: 'bookmark',
      text: 'Anchor...',
      onAction: function onAction() {
        return editor.execCommand('mceAnchor');
      }
    });
  };

  var Plugin = function Plugin() {
    global$2.add('anchor', function (editor) {
      register$2(editor);
      setup(editor);
      register$1(editor);
      register(editor);
      editor.on('PreInit', function () {
        registerFormats(editor);
      });
    });
  };

  Plugin();
})();