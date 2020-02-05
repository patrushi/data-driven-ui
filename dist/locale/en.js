'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = { en: {
        paging: {
            labelRowsPerPage: "Page size: ",
            labelDisplayedRows: function labelDisplayedRows(_ref) {
                var from = _ref.from,
                    to = _ref.to,
                    count = _ref.count;
                return from + '-' + to + ' from ' + count;
            }
        },
        errorPanel: {
            title: 'Something went wrong ...'
        },
        dateField: {
            wrongDateFormat: 'Wrong date format'
        },
        longSelectField: {
            notFoundByText: 'No values found for specified text ...'
        }
    } };