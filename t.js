{
  scopeName = 'source.untitled';
  fileTypes = ( );
  foldingStartMarker = '\{\s*$';
  foldingStopMarker = '^\s*\}';
  patterns = (
    {
      name = 'keyword.control.untitled';
      match = '\b(if|while|for|return)\b';
    },
    {
      name = 'string.quoted.double.untitled';
      begin = '"';
      end = '"';
      patterns = (
        {
          name = 'constant.character.escape.untitled';
          match = '\\.';
        }
      );
    },
     );
}
{
  "contributes": {
    "languages": [
      {
        "id": "abc",
        "extensions": [".abc"]
      }
    ],
      "grammars": [
        {
          "language": "abc",
          "scopeName": "source.abc",
          "path": "./syntaxes/abc.tmGrammar.json"
        }
      ]
  }
}

const js = {
  "scopeName": "source.abc",
  "patterns": [{ "include": "#expression" }],
  "repository": {
    "expression": {
      "patterns": [{ "include": "#letter" }, { "include": "#paren-expression" }]
    },
    "letter": {
      "match": "a|b|c",
      "name": "keyword.letter"
    },
    "paren-expression": {
      "begin": "\\(",
      "end": "\\)",
      "beginCaptures": {
        "0": { "name": "punctuation.paren.open" }
      },
      "endCaptures": {
        "0": { "name": "punctuation.paren.close" }
      },
      "name": "expression.group",
      "patterns": [{ "include": "#expression" }]
    }
  }
}