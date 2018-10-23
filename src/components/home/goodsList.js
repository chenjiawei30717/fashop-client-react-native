import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import { windowWidth, ThemeStyle } from '../../utils/PublicStyleModule';

export default class Index extends Component {
    render() {
        const { data, options } = this.props.data
        const { goods_display_field, layout_style } = options
        const showTitle = goods_display_field.indexOf('title') > -1
        const showPrice = goods_display_field.indexOf('price') > -1
        const showMarketPrice = goods_display_field.indexOf('market_price') > -1
        // 显示内容：商品名称title、商品销售价price、商品原价market_price
        // 展示形式：大图1、小图2、一大两小3、列表4
        return <View style={styles.goodsListWarp}>
            {
                data.map((item,index)=>{
                    const params = {
                        item,
                        index,
                        showTitle,
                        showPrice,
                        showMarketPrice
                    }
                    switch (layout_style) {
                        // case 1: return this.big(params);
                        // case 2: return this.small(params);
                        // case 3: return this.oneBigTwoSmall(params);
                        // case 4: return this.list(params);
                        // default: return <Text>NULL</Text>
                        default: return this.small(params);
                    }
                })
            }
        </View>
    }
    big({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <View
                key={index}
                style={styles.bigWarp}
                onPress={() => this.pushFunc(item.id)}
            >
                <Image style={styles.bigImg} source={{uri: item.img}} />
                <View style={styles.bigBot}>
                    <Text style={styles.bigTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text style={styles.bigMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.bigPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }
    small({item, index, showTitle, showPrice, showMarketPrice}) {
        // const { data } = this.props;
        return (
            <View
                // className={styles.smallWarp}
                key={index}
                onPress={() => this.pushFunc(item.id)}
                style={
                    index % 2 === 0 ? {
                        marginRight: 10,
                        width: (windowWidth - 10 - 30) / 2,
                        marginBottom: 10
                    } : {
                        width: (windowWidth - 10 - 30) / 2,
                        marginBottom: 10
                    }
                }
            >
                <Image style={styles.smallImg} source={{uri: item.img}} />
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text style={styles.smallMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.smallPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }
    oneBigTwoSmall({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <View
                key={index}
                onPress={() => this.pushFunc(item.id)}
                style={{
                    width: `${
                        (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ?
                            (windowWidth - 10 - 30) / 2 : windowWidth
                        }`,
                    marginRight: `${
                        (index + 1) % 3 === 2 ? 10 : 0
                        }`
                }}
            >
                <Image style={styles.smallImg} source={{uri: item.img}} />
                <View style={styles.smallBot}>
                    <Text style={styles.smallTitle} numberOfLines={2}>{showTitle ? item.title : ''}</Text>
                    <View>
                        <Text style={styles.smallMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.smallPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }
    list({item, index, showTitle, showPrice, showMarketPrice}) {
        return (
            <View
                style={styles.listWarp}
                key={index}
                onPress={() => this.pushFunc(item.id)}
            >
                <View style={styles.listImgWarp}>
                    <Image style={styles.listImg} source={{uri: item.img}} />
                </View>
                <View style={styles.listRight}>
                    <Text style={styles.listTitle} numberOfLines={3} >{showTitle ? item.title : ''}</Text>
                    <View style={styles.listPrice}>
                        <Text style={styles.listMarketPriceText}>{showMarketPrice ? `￥${item.market_price}` : ''}</Text>
                        <Text style={styles.listPriceText}>{showPrice ? `￥${item.price}` : ''}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    // warp
    goodsListWarp:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
    },
    // list
    listWarp:{
        width: windowWidth,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eaeaea',
    },
    listImgWarp:{
        width: 100,
        height: 100,
        marginRight: 10,
    },
    listImg:{
        // width: (windowWidth-40)/2,
        // height: (windowWidth-40)/2,
    },
    listRight:{
        flex: 1,
        /* justify-content: space-around, */
    },
    listTitle:{
        marginBottom: 20,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    listMarketPriceText:{
        fontSize: 12,
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    listPriceText:{
        color: ThemeStyle.ThemeColor,
    },

    // big
    bigWarp:{
        marginBottom: 15,
    },
    bigImg:{
        width: windowWidth-30,
        height: (windowWidth-30)*0.88,
    },
    bigBot:{
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    bigTitle:{
        marginVertical: 6,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
    },
    bigMarketPriceText:{
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    bigPriceText:{
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },

    // small

    smallImg:{
        width: (windowWidth - 40) / 2,
        height: (windowWidth - 40) / 2,
    },
    smallBot:{
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    smallTitle:{
        marginVertical: 6,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        height: 40
    },
    smallMarketPriceText:{
        marginRight: 6,
        color: '#ccc',
        textDecorationLine: 'line-through'
    },
    smallPriceText:{
        color: ThemeStyle.ThemeColor,
        marginBottom: 10,
    },
});