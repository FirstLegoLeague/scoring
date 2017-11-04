define('directives/datatable',[
    'directives/ng-directives',
],function(module) {
    return module.directive('ngDatatable',['$timeout', function($timeout) {
        return {
            restrict: 'E',
            scope: {},
            link: function(scope, element, attrs) {
                var doNothing = () => {};
                var returnTrue = () => true;
                var returnEmptyString = () => '';

                var attrConfig = scope.$parent.$eval(attrs.config);
                var attrCollection = scope.$parent.$eval(attrs.collection);

                scope.config = {
                    columns: attrConfig.columns.map(column => {
                        var newColumn = {
                            field: column.field,
                            header: column.header,
                            edit: column.edit || false,
                            show: column.show || returnTrue,
                            onCellClick: column.onCellClick
                        };
                        if(newColumn.edit) {
                            newColumn.writeField = column.writeField || column.field;
                            if(newColumn.edit === 'options' || newColumn.edit === 'complex_options') {
                                newColumn.options = column.options.map(option => {
                                    if(typeof option === String) {
                                        return { value: option, text: option };
                                    } else {
                                        return { value: option.value, text: option.text };
                                    }
                                });
                                if(newColumn.edit === 'complex_options') {
                                    newColumn.onChange = column.onChange || doNothing;
                                }
                            }
                        }
                        return newColumn;
                    }),
                    actions: attrConfig.actions.map(action => {
                        return {
                            onClick: action.onClick || doNothing,
                            show: action.show || returnTrue,
                            classes: action.classes || returnEmptyString,
                            icon: action.icon || ''
                        };
                    }),
                    row: {
                        classes: attrConfig.row ? (attrConfig.row.classes || returnEmptyString) : returnEmptyString,
                        show: attrConfig.row ? (attrConfig.row.show || returnTrue) : returnTrue
                    },
                    sort: attrConfig.sort,
                    search: attrConfig.search || returnEmptyString
                };

                scope.collection = attrCollection || [];

                scope.sort = {
                    sort: scope.config.columns[attrs.config.sort || 0],
                    reverse: attrConfig.reverse || false,
                    get: () => scope.sort.sort,
                    set: (column) => {
                        if(cope.sort.disabled) {
                            return;
                        }
                        if(scope.sort.sort === column) {
                            scope.sort.reverse = !scope.sort.reverse;
                        } else {
                            scope.sort.sort = column;
                        }
                    },
                    icon: (column) => {
                        if(scope.sort.disabled || scope.sort.sort !== column) {
                            return '';
                        }
                        if (scope.sort.reverse) {
                            return 'arrow_drop_down';
                        } else {
                            return 'arrow_drop_up';
                        }
                    },
                    disabled: attrConfig.sort || attrConfig.disableSort,
                };

                if(attrConfig.edit) {
                    scope.edit = {
                        is: (item, column) =>  scope.edit.editing && scope.edit.editing.item === item && scope.edit.editing.column === column,
                        start: (item, column) => {
                            if(column.edit) {
                                scope.edit.editing = { item: item, column: column, originalValue: angular.copy(item[column.field]) }
                                $timeout(() => {
                                    angular.element(`ng-datatable#${attrConfig.id} tbody tr.${scope.config.row.classes(item)} td.${column.field} .${column.edit}`).focus();
                                });
                            }
                        },
                        save: () => {
                            if(!scope.create || scope.edit.editing.item !== scope.create.newItem && attrConfig.edit.onSave) {
                                attrConfig.edit.onSave(scope.edit.editing.item, scope.edit.editing.column, scope.edit.editing.originalValue, scope.edit.editing.item[scope.edit.editing.column.field]);
                            }
                            scope.edit.editing = undefined;
                        },
                        cancel: () => {
                            if(!scope.create || scope.edit.editing.item !== scope.create.newItem) {
                                scope.edit.editing.item[scope.edit.editing.column.field] = scope.edit.editing.originalValue;
                                if(attrConfig.edit.onCancel) {
                                    attrConfig.edit.onCancel(scope.edit.editing.item, scope.edit.editing.column, scope.edit.editing.originalValue);
                                }
                            }
                            scope.edit.editing = undefined;
                        }
                    };
                } else {
                    scope.edit = false;
                }

                if(attrConfig.create && attrConfig.edit) {
                    scope.create = {
                        classes: attrConfig.create.classes || returnEmptyString,
                        show: attrConfig.create.show || returnTrue,
                        message: attrConfig.create.message || '',
                        disableMessage: () => {
                            scope.create.showMessage = false;
                            $timeout(() => {
                                angular.element(`ng-datatable#${attrConfig.id} tbody tr:last-child td:first-child`).triggerHandler('click');
                            });
                        },
                        reset: () => {
                            scope.create.showMessage = true;
                            scope.create.newItem = {};
                            scope.config.columns.forEach((column) => scope.create.newItem[column.key] = '');
                        },
                        save: () => {
                            if(attrConfig.create.save) {
                                attrConfig.create.save(scope.create.newItem);
                            }
                            scope.create.reset();
                        }
                    }
                    scope.create.reset();
                } else {
                    scope.create = false;
                }

                scope.onCellClick = function(item, column) {
                    if(column.onCellClick) {
                        column.onCellClick(item);
                    } else if(scope.edit && !scope.edit.is(item, column)) {
                        scope.edit.start(item, column);
                    }
                };
            },
            templateUrl: 'js/directives/datatable.html'
        };
    }]);
});
