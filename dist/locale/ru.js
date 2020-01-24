'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var locale = exports.locale = {
    paging: {
        labelRowsPerPage: "Показывать по: ",
        labelDisplayedRows: function labelDisplayedRows(_ref) {
            var from = _ref.from,
                to = _ref.to,
                count = _ref.count;
            return from + '-' + to + ' \u0438\u0437 ' + count;
        }
    },
    errorPanel: {
        title: 'Что-то пошло не так ...'
    },
    dateField: {
        wrongDateFormat: 'Неверный формат даты'
    },
    longSelectField: {
        notFoundByText: 'По заданному тексту не найдено значений ...'
    }
};