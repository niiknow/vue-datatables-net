/*!
 * vue-datatables-net
 * Vue jQuery DataTables.net wrapper component
 *
 * @version v1.4.2
 * @author friends@niiknow.org
 * @repository https://github.com/niiknow/vue-datatables-net.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VdtnetTable", [], factory);
	else if(typeof exports === 'object')
		exports["VdtnetTable"] = factory();
	else
		root["VdtnetTable"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var myUniqueId = 1;
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VdtnetTable',
  props: {
    /**
     * The table id
     *
     * @type String
     */
    id: {
      type: String,
      "default": null
    },

    /**
     * Set the container classes.
     *
     * @type String
     */
    containerClassName: {
      type: String,
      "default": 'table-responsive d-print-inline'
    },

    /**
     * Set the input column search classes.
     *
     * @type String
     */
    columnSearchClassName: {
      type: String,
      "default": 'form-control form-control-sm'
    },

    /**
     * Set the tfoot classes.
     *
     * @type String
     */
    tfootClassName: {
      type: String
    },

    /**
     * Set the thead classes.
     *
     * @type String
     */
    theadClassName: {
      type: String
    },

    /**
     * Set the table classes you wish to use, default with bootstrap4
     * but you can override with: themeforest, foundation, etc..
     *
     * @type String
     */
    className: {
      type: String,
      "default": 'table table-striped table-bordered nowrap w-100'
    },

    /**
     * the options object: https://datatables.net/manual/options
     *
     * @type Object
     */
    opts: {
      type: Object
    },

    /**
     * List all fields to be converted to opts columns
     *
     * @type Object
     */
    fields: {
      type: Object
    },

    /**
     * Pass in DataTables.Net jQuery to resolve any conflict from
     * multiple jQuery loaded in the browser
     *
     * @type Object
     */
    jquery: {
      type: Object
    },

    /**
     * Pass in Vue to resolve any conflict from multiple loaded
     *
     * @type Object
     */
    vue: {
      type: Object
    },

    /**
     * The select-checkbox column index (start at 1)
     * Current implementation require datatables.net-select
     *
     * @type Number
     */
    selectCheckbox: {
      type: Number,
      "default": -1
    },

    /**
     * Provide custom local data loading.  Warning: this option has not been
     * thoroughly tested.  Please use ajax and serverSide instead.
     *
     * @type Function
     */
    dataLoader: {
      type: Function
    },

    /**
     * true to hide the footer of the table
     *
     * @type Boolean
     */
    hideFooter: {
      type: Boolean
    },

    /**
     * true to hide the tfoot of the table
     *
     * @type Boolean
     */
    hideTfoot: {
      type: Boolean,
      "default": true
    },

    /**
     * true to hide the individual column search of the table
     *
     * @type Boolean
     */
    columnSearch: {
      type: Boolean,
      "default": false
    },

    /**
     * The details column configuration of master/details.
     *
     * @type {Object}
     */
    details: {
      type: Object
    }
  },
  data: function data() {
    // initialize defaults
    return {
      tableId: null,
      options: {
        /*eslint-disable */
        dom: "tr<'row vdtnet-footer'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'pl>>",

        /*eslint-enable */
        columns: [],
        language: {
          infoFiltered: ''
        },
        lengthMenu: [[15, 100, 500, 1000, -1], [15, 100, 500, 1000, 'All']],
        pageLength: 15,
        buttons: [] // remove any button defaults

      },
      dataTable: null,
      vdtnet: this
    };
  },
  computed: {
    jq: function jq() {
      return this.jquery || window.jQuery;
    },
    myVue: function myVue() {
      return this.vue || window.Vue;
    },
    classes: function classes() {
      var that = this;
      var classes = "".concat(that.containerClassName, " vdtnet-container");

      if (this.hideFooter) {
        classes += ' hide-footer';
      }

      return classes;
    }
  },
  created: function created() {
    var that = this;
    var jq = that.jq;
    var startCol = 0;
    var icol = 0;
    that.tableId = that.id || "vdtnetable".concat(myUniqueId++); // allow user to override default options

    if (that.opts) {
      that.options = jq.extend({}, that.options, that.opts);
    }

    that.options.order = that.options.order || [[startCol, 'asc']];

    if (that.fields) {
      var fields = that.fields;
      var cols = that.options.columns;
      var orders = that.options.order;

      for (var k in fields) {
        var field = fields[k];
        field.name = field.name || k; // disable search and sort for local field

        if (field.isLocal) {
          field.searchable = false;
          field.sortable = false;
        } // generate


        var col = {
          label: field.label || field.name,
          data: field.data || field.name,
          width: field.width,
          name: field.name,
          className: field.className,
          index: field.index || icol + 1
        };

        if (field.hasOwnProperty('defaultContent')) {
          col.defaultContent = field.defaultContent;
        }

        if (field.hasOwnProperty('sortable')) {
          col.orderable = field.sortable;
        }

        if (field.hasOwnProperty('visible')) {
          col.visible = field.visible;
        }

        if (field.hasOwnProperty('searchable')) {
          col.searchable = field.searchable;
        }

        if (field.hasOwnProperty('editField')) {
          col.editField = field.editField;
        }

        if (field.hasOwnProperty('classHeaderName')) {
          col.classHeaderName = field.classHeaderName;
        }

        if (field.hasOwnProperty('classFooterName')) {
          col.classFooterName = field.classFooterName;
        }

        if (field.template) {
          col.template = field.template;
        }

        if (field.render) {
          col.render = field.render;
        } // console.log(col)


        cols.push(col);

        if (field.defaultOrder) {
          orders.push([icol, field.defaultOrder]);
        }

        icol++;
      }
    }

    if (that.selectCheckbox) {
      // create checkbox column
      var _col = {
        orderable: false,
        searchable: false,
        name: '_select_checkbox',
        className: 'select-checkbox d-print-none',
        data: null,
        defaultContent: '',
        index: that.selectCheckbox - 1
      };
      that.options.columns.splice(that.selectCheckbox - 1, 0, _col); // console.log(that.options.columns)

      that.options.select = that.options.select || {
        style: 'os',
        selector: 'td.select-checkbox'
      };

      if (that.selectCheckbox === 1) {
        startCol++;
      }
    } // handle master details


    if (that.details) {
      var detailsIndex = that.details.index || 1; // create details column

      var _col2 = {
        orderable: false,
        searchable: false,
        name: '_details_control',
        className: 'details-control d-print-none',
        data: null,
        defaultContent: that.details.icons || '<span class="details-plus" title="Show details">+</span><span class="details-minus" title="Hide details">-</span>',
        index: detailsIndex - 1
      };
      that.options.columns.splice(detailsIndex - 1, 0, _col2);

      if (detailsIndex === 1) {
        startCol++;
      }
    }

    if (startCol > 0) {
      if (that.options.order) {
        that.options.order.forEach(function (v) {
          v[0] += startCol;
        });
      } else {
        that.options.order = [[startCol, 'asc']];
      }
    }
  },
  mounted: function mounted() {
    var that = this;
    var jq = that.jq;
    var $el = jq(that.$refs.table);
    var cols = that.options.columns;

    for (var k in cols) {
      var col = cols[k];

      if (col.template || that.$scopedSlots[col.name]) {
        col.render = that.compileTemplate(col, that.$scopedSlots[col.name]);
      }

      if (col.render) {
        if (!col.render.templated) {
          (function () {
            var myRender = col.render;

            col.render = function () {
              return myRender.apply(that, Array.prototype.slice.call(arguments));
            };
          })();
        }
      }

      if (col.template) {
        delete col.template;
      }
    } // handle local data loader


    if (that.dataLoader) {
      delete that.options.ajax;
      that.options.serverSide = false;
    }

    if (!that.hideFooter && that.columnSearch) {
      that.options.initComplete = function () {
        var api = this.api();
        var state = api.state.loaded();
        api.columns().every(function () {
          var that = this;
          var colIdx = this.index();

          if (state) {
            var colSearch = state.columns[colIdx].search;

            if (colSearch.search) {
              jq('input', this.footer()).val(colSearch.search);
            }
          }

          jq('input', this.footer()).on('keyup change clear search', function () {
            if (that.search() !== this.value) {
              that.search(this.value).draw();
            }
          });
        });
      };
    } // you can access and update the that.options and $el here before we create the DataTable


    that.$emit('table-creating', that, $el);
    that.dataTable = $el.DataTable(that.options);

    if (that.selectCheckbox) {
      // handle select all checkbox
      $el.on('click', 'th input.select-all-checkbox', function (e) {
        if (jq(e.target).is(':checked')) {
          that.dataTable.rows().select();
        } else {
          that.dataTable.rows().deselect();
        }
      }); // handle individual row select events

      that.dataTable.on('select deselect', function (e, dt, type, indexes) {
        var $input = $el.find('th input.select-all-checkbox');

        if (that.dataTable.rows({
          selected: true
        }).count() !== that.dataTable.rows().count()) {
          jq('th.select-checkbox').removeClass('selected');
          $input.attr('checked', false);
        } else {
          jq('th.select-checkbox').addClass('selected');
          $input.attr('checked', true);
        } // type is select/deselect so event become row-select or row-deselect


        that.$emit('row-' + e.type, {
          dataTable: that.dataTable,
          e: e,
          dt: dt,
          type: type,
          indexes: indexes
        }); // to get data, see const examples below
        // const rows = event.dataTable.rows( event.indexes )
        // const data = rows.data()
      });
    } // wire up edit, delete, and/or action buttons


    $el.on('click', '[data-action]', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var target = jq(e.target);
      var action = target.attr('data-action'); // no action, simply exit

      if (!action) {
        return;
      } else {
        var tr = target; // detect if action is inside a row
        // get data from parent row/tr

        if (target.prop('tagName') !== 'TR') {
          tr = target.closest('tr');
        }

        if (tr) {
          // if child row, get previous/parent row
          if (tr.hasClass('master-details')) {
            tr = tr.prev();
          }

          var row = that.dataTable.row(tr);
          var data = row.data();
          that.$emit(action, data, row, tr, target);
        } else {
          // not a row click, must be other kind of action
          // such as bulk, csv, pdf, etc...
          that.$emit(action, null, null, null, target);
        }
      }
    }); // handle master/details

    if (that.details) {
      // default to render function
      var renderFunc = that.details.render; // must be string template

      if (that.details.template || that.$scopedSlots['_details']) {
        renderFunc = that.compileTemplate(that.details, that.$scopedSlots['_details']);
      } else if (renderFunc) {
        renderFunc = function renderFunc() {
          return that.details.render.apply(that, Array.prototype.slice.call(arguments));
        };
      } // handle master/details
      // Add event listener for opening and closing details


      $el.on('click', 'td.details-control', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var target = jq(e.target);
        var tr = target.closest('tr');

        if (tr.hasClass('master-details')) {
          tr = tr.prev();
        }

        var row = that.dataTable.row(tr);

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('master');
        } else {
          // Open this row
          var data = row.data();
          row.child(renderFunc(data, 'child', row, tr)).show();
          tr.addClass('master').next().addClass('master-details');
        }
      });
    }

    that.$emit('table-created', that); // finally, load data

    if (that.dataLoader) {
      that.reload();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var that = this;

    if (that.dataTable) {
      that.dataTable.destroy(true);
    }

    that.dataTable = null;
  },
  methods: {
    /**
     * Vue.compile a template string and return the compiled function
     *
     * @param  {Object} object with template property
     * @param  {Object} the slot
     * @return {Function}          the compiled template function
     */
    compileTemplate: function compileTemplate(field, slot) {
      var that = this;
      var jq = that.jq;
      var vue = that.myVue;
      var res = vue.compile("<div>".concat(field.template || '', "</div>"));

      var renderFunc = function renderFunc(data, type, row, meta) {
        var myRender = res.render;

        if (slot) {
          myRender = function myRender(createElement) {
            return createElement('div', [slot({
              data: data,
              type: type,
              row: row,
              meta: meta,
              vdtnet: that,
              def: field,
              comp: that.$parent
            })]);
          };
        }

        var comp = new vue({
          data: {
            data: data,
            type: type,
            row: row,
            meta: meta,
            vdtnet: that,
            def: field,
            comp: that.$parent
          },
          render: myRender,
          staticRenderFns: res.staticRenderFns
        }).$mount();
        return jq(comp.$el).html();
      };

      renderFunc.templated = true;
      return renderFunc;
    },

    /**
     * Set table data array that was loaded from somewhere else
     * This method allow for local setting of data; though, it
     * is recommended to use ajax instead of this.
     *
     * @param {Array} data   the array of data
     * @return {Object}            the component
     */
    setTableData: function setTableData(data) {
      var that = this;

      if (data.constructor === Array) {
        that.dataTable.clear().rows.add(data);
        that.dataTable.draw(false);
        that.dataTable.columns.adjust();
      }

      return that;
    },

    /**
     * pass through reload method
     *
     * @param  {Boolean}  resetPaging true to reset current page position
     * @return {Object}            the component
     */
    reload: function reload() {
      var resetPaging = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var that = this;

      if (that.dataLoader) {
        // manual data loading
        that.dataLoader(function (data) {
          if (data && !data.data) {
            data = {
              data: data
            };
          }

          that.setTableData(data.data);
          that.$emit('reloaded', data, that);
        });
      } else {
        that.dataTable.ajax.reload(function (data) {
          that.$emit('reloaded', data, that);
        }, resetPaging);
      }

      return that;
    },
    search: function search(value) {
      var that = this;
      that.dataTable.search(value).draw();
      return that;
    },
    setPageLength: function setPageLength(value) {
      var that = this;
      that.dataTable.page.len(value);
      return that.reload();
    },
    getServerParams: function getServerParams() {
      if (this.dataLoader) {
        return {};
      }

      return this.dataTable.ajax.params();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.select-checkbox, .select-all-checkbox {\n  cursor: pointer;\n}\n.vdtnet-footer .dataTables_length {\n  padding-top: 6px;\n  padding-right: 10px;\n}\n.vdtnet-footer .dataTables_length, .vdtnet-footer .dataTables_paginate {\n  float: right;\n}\n.hide-footer .vdtnet-footer {\n  display: none;\n}\n.master .details-plus\n{\n  cursor: pointer;\n  display: none;\n}\n.details-minus\n{\n  cursor: pointer;\n  display: none;\n}\n.master .details-minus\n{\n  cursor: pointer;\n  display: inline;\n}\n.details-control {\n  cursor: pointer;\n  font-weight: 700;\n}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./VdtnetTable.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/VdtnetTable.vue":
/*!*****************************!*\
  !*** ./src/VdtnetTable.vue ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VdtnetTable.vue?vue&type=template&id=c0350a64& */ "./src/VdtnetTable.vue?vue&type=template&id=c0350a64&");
/* harmony import */ var _VdtnetTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VdtnetTable.vue?vue&type=script&lang=js& */ "./src/VdtnetTable.vue?vue&type=script&lang=js&");
/* harmony import */ var _VdtnetTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VdtnetTable.vue?vue&type=style&index=0&lang=css& */ "./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _VdtnetTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__.render,
  _VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/VdtnetTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/VdtnetTable.vue?vue&type=script&lang=js&":
/*!******************************************************!*\
  !*** ./src/VdtnetTable.vue?vue&type=script&lang=js& ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./VdtnetTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************!*\
  !*** ./src/VdtnetTable.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/style-loader/dist/cjs.js!../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!../node_modules/vue-loader/lib/index.js??vue-loader-options!./VdtnetTable.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./src/VdtnetTable.vue?vue&type=template&id=c0350a64&":
/*!************************************************************!*\
  !*** ./src/VdtnetTable.vue?vue&type=template&id=c0350a64& ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VdtnetTable_vue_vue_type_template_id_c0350a64___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib/index.js??vue-loader-options!./VdtnetTable.vue?vue&type=template&id=c0350a64& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=template&id=c0350a64&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=template&id=c0350a64&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/VdtnetTable.vue?vue&type=template&id=c0350a64& ***!
  \***************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { class: _vm.classes }, [_vm._m(0)])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "table",
      {
        ref: "table",
        class: _vm.className,
        attrs: { id: _vm.tableId, cellpadding: "0" }
      },
      [
        _c("thead", { class: _vm.theadClassName }, [
          _c(
            "tr",
            _vm._l(_vm.options.columns, function(field, i) {
              return _c(
                "th",
                { key: "head_" + i, class: field.classHeaderName },
                [
                  _vm._t(
                    "HEAD_" + field.name,
                    [
                      field.name === "_select_checkbox"
                        ? _c("input", {
                            staticClass: "select-all-checkbox d-print-none",
                            attrs: { type: "checkbox" }
                          })
                        : _c("div", {
                            domProps: { innerHTML: _vm._s(field.label) }
                          })
                    ],
                    { field: field, i: i }
                  )
                ],
                2
              )
            }),
            0
          )
        ]),
        _vm._v(" "),
        !_vm.hideTfoot
          ? _c("tfoot", { class: _vm.tfootClassName }, [
              _c(
                "tr",
                _vm._l(_vm.options.columns, function(field, i) {
                  return _c(
                    "th",
                    { key: "foot_" + i, class: field.classFooterName },
                    [
                      _vm._t(
                        "FOOT_" + field.name,
                        [
                          _vm.columnSearch &&
                          (field.searchable ||
                            typeof field.searchable === "undefined")
                            ? _c("input", {
                                class: _vm.columnSearchClassName,
                                attrs: {
                                  placeholder: field.label,
                                  type: "search"
                                }
                              })
                            : !_vm.columnSearch
                            ? _c("div", {
                                domProps: { innerHTML: _vm._s(field.label) }
                              })
                            : _vm._e()
                        ],
                        { field: field, i: i }
                      )
                    ],
                    2
                  )
                }),
                0
              )
            ])
          : _vm._e()
      ]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ normalizeComponent; }
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VdtnetTable_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VdtnetTable.vue */ "./src/VdtnetTable.vue");

/* harmony default export */ __webpack_exports__["default"] = (_VdtnetTable_vue__WEBPACK_IMPORTED_MODULE_0__.default);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map