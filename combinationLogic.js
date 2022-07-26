    var produtos = ["item1", "item2", "item3", "item4", "item5", "item6"] 
    var pedido1 = { products: ["item1", "item2"] } 
    var pedido2 = { products: ["item1", "item4"] } 
    var pedido3 = { products: ["item1", "item6", "item2", "item5"] } 
    var pedido4 = { products: ["item6", "item2", "item5"] } 
    var pedido5 = { products: ["item2", "item4", "item1", "item3"] } 
    var pedido6 = { products: ["item2", "item4", "item1", "item3", "item5"] } 
    var pedido7 = { products: ["item6", "item1", "item5"] } 
    var pedido8 = { products: ["item3", "item4", "item1"] } 
    var pedido9 = { products: ["item6", "item4", "item5", "item1"] } 
    var pedidos = [pedido1, pedido2, pedido3, pedido4, pedido5, pedido6, pedido7, pedido8, pedido9] 
    var combinacoes = {} 
    
    for (const item of produtos) {
        for (const pedido of pedidos) {
            if (pedido.products.includes(item)) {
                for (const subItems of pedido.products) { 
                    if (subItems !== item) { 
                        combinacoes = { 
                            ...combinacoes, 
                            [item]: { 
                                ...combinacoes[item],
                                 [subItems]: (!!combinacoes[item] ? (!!combinacoes[item][subItems] ? combinacoes[item][subItems] + 1 : 1) : 1) 
                            } 
                        } 
                    } 
                }
            }
        }
    }

    var topCombinations = []
    var getApparitions = (index) => {
        return topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])][Object.getOwnPropertyNames(topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])])];
    }

    var changePosition = (from,to) => {
        return topCombinations.splice(to, 0, topCombinations.splice(from, 1)[0]);
    }

    for (const item of produtos) { 
        if (!!combinacoes[item]) { 
            for (const subItem of produtos) { 
                if (!!combinacoes[item][subItem] && (!topCombinations[2] || combinacoes[item][subItem] >= getApparitions(2))) { 
                    if (!topCombinations[0] || combinacoes[item][subItem] >= getApparitions(0)) { 
                        topCombinations[2] = topCombinations[1]; 
                        topCombinations[1] = topCombinations[0];
                        topCombinations[0] = {
                             [item]: { 
                                [subItem]: combinacoes[item][subItem] 
                            } 
                        } 
                    } else if (!topCombinations[1] || combinacoes[item][subItem] >= getApparitions(1)) { 
                        topCombinations[2] = topCombinations[1]; 
                        topCombinations[1] = { 
                            [item]: { 
                                [subItem]: combinacoes[item][subItem] 
                            } 
                        } 
                    } else { 
                        topCombinations[2] = { 
                            [item]: { 
                                [subItem]: combinacoes[item][subItem] 
                            } 
                        } 
                    } 
                } 
            } 
        } 
    }
    
    console.log(topCombinations);
    topCombinations.push({
        "AddExample":{
            "any":2
        }
    });
    console.log(topCombinations);
    changePosition(topCombinations.length-1,0);
    console.log(topCombinations);
