function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var json2tsv_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.json2tsv = void 0;
    function assertString2DArray(arg) {
        if (!Array.isArray(arg)) {
            throw new TypeError(`Expected string[][], got ${typeof arg}`);
        }
        for (const x of arg){
            if (!Array.isArray(x)) {
                throw new TypeError(`Expected string[][], got ${typeof x}[]`);
            }
            for (const y of x){
                if (typeof y !== "string") {
                    throw new TypeError(`Expected string[][], got ${typeof y}[][]`);
                }
            }
        }
    }
    const SPECIAL_CHAR_REGEX = /[\t\n"]/;
    function hasSpecialChar(string) {
        return SPECIAL_CHAR_REGEX.test(string);
    }
    function json2tsv2(json) {
        assertString2DArray(json);
        return json.map((row)=>{
            return row.map((cell)=>{
                return hasSpecialChar(cell) ? `"${cell.replace(/"/g, '""')}"` : cell;
            }).join("	");
        }).join("\n");
    }
    exports.json2tsv = json2tsv2;
});
var tsv2json_1 = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.tsv2json = void 0;
    function extractFirstCell(tsvCharacters) {
        const result = [];
        let escapedMode = tsvCharacters[0] === '"';
        let index = escapedMode ? 1 : 0;
        function done(lineIsOver) {
            tsvCharacters.splice(0, index + 1);
            return {
                cell: result.join(""),
                lineIsOver
            };
        }
        while(index < tsvCharacters.length){
            const __char = tsvCharacters[index];
            const nextChar = tsvCharacters[index + 1];
            if (escapedMode) {
                if (__char === '"') {
                    if (nextChar === '"') {
                        result.push('"');
                        index++;
                    } else {
                        escapedMode = false;
                    }
                } else {
                    result.push(__char);
                }
            } else {
                if (__char === "\r" && nextChar === "\n") {
                    index++;
                    return done(true);
                }
                if (__char === "\n") return done(true);
                if (__char === "	") return done(false);
                result.push(__char);
            }
            index++;
        }
        return done(true);
    }
    function tsv2json2(tsv) {
        if (typeof tsv !== "string") throw new TypeError(`Expected string, got ${typeof tsv}`);
        if (tsv === "") return [
            []
        ];
        const characters = [
            ...tsv
        ];
        const result = [];
        let currentRow = [];
        while(characters.length > 0){
            const { cell , lineIsOver  } = extractFirstCell(characters);
            currentRow.push(cell);
            if (lineIsOver) {
                result.push(currentRow);
                currentRow = [];
            }
        }
        return result;
    }
    exports.tsv2json = tsv2json2;
});
var source = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.tsv2json = exports.json2tsv = void 0;
    var json2tsv_2 = json2tsv_1;
    Object.defineProperty(exports, "json2tsv", {
        enumerable: true,
        get: function() {
            return json2tsv_2.json2tsv;
        }
    });
    var tsv2json_2 = tsv2json_1;
    Object.defineProperty(exports, "tsv2json", {
        enumerable: true,
        get: function() {
            return tsv2json_2.tsv2json;
        }
    });
    exports.default = {
        json2tsv: json2tsv_1.json2tsv,
        tsv2json: tsv2json_1.tsv2json
    };
    module.exports = {
        json2tsv: json2tsv_1.json2tsv,
        tsv2json: tsv2json_1.tsv2json
    };
    module.exports.default = {
        json2tsv: json2tsv_1.json2tsv,
        tsv2json: tsv2json_1.tsv2json
    };
});
getDefaultExportFromCjs(source);
source.json2tsv;
var tsv2json = source.tsv2json;
const csvparser = (csv)=>{
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for(var i = 1; i < lines.length; i++){
        var obj = {};
        var row = lines[i], queryIdx = 0, startValueIdx = 0, idx = 0;
        if (row.trim() === '') {
            continue;
        }
        while(idx < row.length){
            var c = row[idx];
            if (c === '"') {
                do {
                    c = row[++idx];
                }while (c !== '"' && idx < row.length - 1)
            }
            if (c === ',' || idx === row.length - 1) {
                var value = row.substr(startValueIdx, idx - startValueIdx).trim();
                if (value[0] === '"') {
                    value = value.substr(1);
                }
                if (value[value.length - 1] === ',') {
                    value = value.substr(0, value.length - 1);
                }
                if (value[value.length - 1] === '"') {
                    value = value.substr(0, value.length - 1);
                }
                var key = headers[queryIdx++];
                obj[key] = value;
                startValueIdx = idx + 1;
            }
            ++idx;
        }
        result.push(obj);
    }
    return result;
};
const tsvparser = (tsv)=>{
    let rows = tsv2json(tsv);
    const headers = rows[0];
    return rows.slice(1).map((row)=>{
        return headers.reduce((obj, nextKey, index)=>{
            obj[nextKey] = row[index];
            return obj;
        }, {});
    });
};
const getSheetData = async (url, type = 'tvs')=>{
    const parser = type === 'tvs' ? tsvparser : csvparser;
    const data = await fetch(url).then((r)=>r.text()
    );
    return parser(data);
};