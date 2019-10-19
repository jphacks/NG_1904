# データの仕様  

## Record終了時にResultページに渡されるjson  
```json  
[
    {
        "str"      : "えっと",
        "type"     : "独立詞",
        "count"    : 10,
        "location" : null,
        "date"     : null
    },...
]
```  

### テストデータ  
```json  
[
    {
        "str"      : "えっと",
        "type"     : "独立詞",
        "count"    : 10,
        "location" : null,
        "date"     : null
    },
    {
        "str"      : "おいしい",
        "type"     : "動詞",
        "count"    : 7,
        "location" : null,
        "date"     : null
    },
    {
        "str"      : "帽子",
        "type"     : "名詞",
        "count"    : 3,
        "location" : null,
        "date"     : null
    },
    {
        "str"      : "Hey",
        "type"     : "陽気詞",
        "count"    : 2,
        "location" : null,
        "date"     : null
    },
    {
        "str"      : "こんにちは",
        "type"     : "挨拶詞",
        "count"    : 1,
        "location" : null,
        "date"     : null
    }
]
```  