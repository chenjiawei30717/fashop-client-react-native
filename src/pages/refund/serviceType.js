import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import OrderModel from '../../models/order'
import { List } from 'antd-mobile-rn';
import { Field, FixedBottom, Cell } from '../../components'

const orderModel = new OrderModel()

export default class ServiceType extends Component {
    state = {
        goodsInfo: null,
    }

    async componentWillMount(options) {
        const goodsInfoResult = await orderModel.goodsInfo({
            id: typeof options['order_goods_id'] !== 'undefined' ? options['order_goods_id'] : 414
        })
        this.setState({
            goodsInfo: goodsInfoResult.info,
        })
    }

    onClick(refundType) {
        this.props.navigation.navigate('RefundServiceApply')
        this.props.navigation.navigate('RefundServiceApply', {
            order_goods_id: this.state.goodsInfo.id,
            refund_type: refundType,
            delta: 2
        })
    }

    render() {
        const { goodsInfo } = this.state
        return <View>
            <List>
                <View style={styles.refundGoodsCard}>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.content}>
                                <View style={styles.image}>
                                    <Image source={goodsInfo.goods_img} resizeMode={'contain'} style={{
                                        width: 60,
                                        height: 60,
                                    }} />
                                </View>
                                <View style={styles.body}>
                                    <Text style={styles.bodyText}>{goodsInfo.goods_title}</Text>
                                    <View style={styles.end}>
                                        <Text style={styles.spec}>{goodsInfo.goods_spec_string}</Text>
                                        <Text style={styles.number}>x {goodsInfo.goods_num}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </List>
            <List>
                <Cell
                    isLink={true}
                    title="仅退款"
                    label="未收到货（包含未签收），或卖家协商同意前提现"
                    onClick={(e) => this.onClick(1)}
                    icon="../../images/refund/refund-type-1.png"
                >
                </Cell>
                <Cell isLink={true}
                      title="退货退款"
                      label="已收到货，需要退换已收到的货物"
                      onClick={(e) => this.onClick(2)}
                      icon="../../images/refund/refund-type-2.png">
                </Cell>
            </List>
        </View>

    }

}
const styles = StyleSheet.create({

    refundGoodsCard: {},
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderBottomColor: "#ff4400",
    },
    content: {

        justifyContent: "flex-start"
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    body: {
        flex: 1
    },
    bodyText: {
        fontSize: 12,
        color: "#333",
        lineHeight: 18,
    },
    end: {
        justifyContent: "space-between",
        marginTop: 5,
        fontSize: 12,
        color: "#999999",
        lineHeight: 12,
        alignItems: "center"
    },
    spec: {
        color: "#999999",
    },
    number: {},
    footer: {
        justifyContent: "flex-end"
    }
})