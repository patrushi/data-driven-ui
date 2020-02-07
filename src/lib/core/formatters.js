// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string/14428340#14428340
// no-extend-native
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 0) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = n === undefined ? this.toString() : this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export function formatNumber(value, meta, def) {
    if (isNaN(value)) return value;
    let metaFormat = meta.format || {}
    if (metaFormat.raw) return value;
    let defFormat = def || {}
    return value.format(
        metaFormat.midpointRounding || defFormat.midpointRounding || undefined,
        metaFormat.splitCnt || defFormat.splitCnt || ((metaFormat.split || defFormat.split) ? 3 : undefined),
        metaFormat.splitSep || defFormat.splitSep || ' ',
        metaFormat.midpointSep || defFormat.midpointSep || '.'
    )
}