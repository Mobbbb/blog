export const months = [
    {
        name: '一月',
        value: '1',
    },
    {
        name: '四月',
        value: '4',
    },
    {
        name: '七月',
        value: '7',
    },
    {
        name: '十月',
        value: '10',
    },
]

export const scoreMap = {
    '迟钝男': 0.5,
    '微萎男': 0.2,
    '枯萎男': 1,
    '恶趣味': 0.5, // 非碳基生物能想的出来的设定

    // 画面分数标签
    '低成本': 0.2,
    'PPT': 0.5,
    '3D低成本': 1,

    '迷惑分镜': 1,

    // 总体剧情分数标签
    '流水剧情': 0.5,
    '下饭片': 1, // 配饭能吃三大碗
    '无脑': 1.2, // 无需带脑，即可观看

    // 细节剧情分数标签
    '迷惑片段': 0.1, // 低智商片段、尬舞、尬聊
    '重复性内容过多': 0.2,
    '细节不严谨': 0.3,
    
    '缺少情感波动': 0.5, // 对于发生的离奇事情，缺少正常人的情感表现

    '反派拉跨': 0.1,
    '反派弱智': 0.3,
    '反派逆天': 0.7, // 反派智商欠缺、主角什么都会
    '天真男主': 0.5,
    '主角智商欠缺': 1, // 男主过于单纯、欠缺思考
    '反派剧情杀': 0.5,

    '似露非露': 0.5, // 卖肉却又不完全卖肉
    '似严非严': 0.5, // 严谨却又不完全严谨

    '叙事连贯性差': 0.2,
    '赶剧情': 0.2,
    '剧情拖沓': 0.3,
    '高开低走': 0.3,
    '剧情迷惑发展': 0.3,
    '槽点过多': 0.5,
    '结尾不深刻': 0.2,

    '配角印象不深': 0.2, // 对于已经出现过的人物，时隔多集后再次出现，不禁发出疑问：“你谁啊？”
    '很强但无脑谨慎': 0.2,
    '很强但无法发力': 0.2,

    '续集无新内容': 0.3,
}

export default [
    {
        name: '食梦者',
        alias: ['爆漫王'],
        description: '',
        label: ['日常', '恋爱', '热血', '奋斗'],
        scoreLabel: [],
        years: '2012',
        month: '10',
        country: '日本',
        cover: require('@/assets/smz3.webp'),
        season: '第三季',
        endProgress: '25',
        episodes: '25',
        comment: '',
    },
    {
        name: '刀剑神域',
        alias: [],
        description: '',
        label: ['RPG', '战斗', '日常', '恋爱'],
        scoreLabel: ['叙事连贯性差'],
        years: '2012',
        month: '7',
        country: '日本',
        cover: require('@/assets/djsy.webp'),
        season: '',
        endProgress: '25',
        episodes: '25',
        comment: '',
    },
    {
        name: '黑子的篮球',
        alias: [],
        description: '',
        label: ['校园', '竞技', '日常', '运动'],
        scoreLabel: [],
        years: '2012',
        month: '4',
        country: '日本',
        cover: require('@/assets/hzdlq.webp'),
        season: '',
        endProgress: '25',
        episodes: '25',
        comment: '',
    },
    {
        name: '在下坂本，有何贵干？',
        alias: ['我叫坂本我最屌'],
        description: '',
        label: ['校园', '搞笑', '日常', '无敌'],
        scoreLabel: [],
        years: '2016',
        month: '4',
        country: '日本',
        cover: require('@/assets/zxbbyhgg.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '亚人',
        alias: [],
        description: '',
        label: ['战斗', '悬疑', '能力'],
        scoreLabel: ['高开低走', '反派剧情杀', '天真男主', '细节不严谨'],
        years: '2016',
        month: '10',
        country: '日本',
        cover: require('@/assets/yr2.webp'),
        season: '第二季',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
    {
        name: '亚人',
        alias: [],
        description: '',
        label: ['战斗', '悬疑', '能力'],
        scoreLabel: [],
        years: '2016',
        month: '1',
        country: '日本',
        cover: require('@/assets/yr.webp'),
        season: '',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
    {
        name: '珈百璃的堕落',
        alias: [],
        description: '',
        label: ['日常', '搞笑'],
        scoreLabel: [],
        years: '2017',
        month: '1',
        country: '日本',
        cover: require('@/assets/jblddl.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: 'JOJO的奇妙冒险',
        alias: [],
        description: '',
        label: ['战斗', '悬疑', '冒险', '能力'],
        scoreLabel: [],
        years: '2018',
        month: '10',
        country: '日本',
        cover: require('@/assets/jojodqmmxhjzf.webp'),
        season: '黄金之风',
        endProgress: '39',
        episodes: '39',
        comment: '',
    },
    {
        name: '刃牙',
        alias: [],
        description: '',
        label: ['战斗', '热血'],
        scoreLabel: [],
        years: '2018',
        month: '7',
        country: '日本',
        cover: require('@/assets/ry.jpg'),
        season: '死囚篇',
        endProgress: '26',
        episodes: '26',
        comment: '',
    },
    {
        name: 'Overlord',
        alias: ['不死者之王'],
        description: '',
        label: ['战斗', '无敌', '悬疑', '异世界'],
        scoreLabel: [],
        years: '2018',
        month: '1',
        country: '日本',
        cover: require('@/assets/overlord2.webp'),
        season: '第二季',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
    {
        name: '灵能百分百',
        alias: ['路人超能100'],
        description: '',
        label: ['战斗', '校园', '日常', '悬疑', '能力'],
        scoreLabel: [],
        years: '2019',
        month: '1',
        country: '日本',
        cover: require('@/assets/lnbfbdej.jpg'),
        season: '第二季',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
    {
        name: '动物狂想曲 / BEASTARS',
        alias: [],
        description: '',
        label: ['战斗', '校园', '恋爱', '日常', '悬疑'],
        scoreLabel: [],
        years: '2019',
        month: '10',
        country: '日本',
        cover: require('@/assets/dwkxq.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '精灵幻想记',
        alias: [],
        description: '',
        label: ['无敌', '恋爱', '战斗', '异世界'],
        scoreLabel: ['低成本', '赶剧情', '剧情迷惑发展', '叙事连贯性差', '缺少情感波动'],
        waitToScore: true,
        years: '2021',
        month: '7',
        country: '日本',
        cover: require('@/assets/jlhxj.webp'),
        season: '',
        endProgress: '2',
        episodes: '12',
        comment: '',
    },
    {
        name: '在世界尽头咏唱恋曲的少女YU-NO',
        alias: [],
        description: '',
        label: ['悬疑', '科幻', '穿越', '恋爱'],
        scoreLabel: ['低成本', '赶剧情', '剧情迷惑发展', '叙事连贯性差', '缺少情感波动'],
        years: '2019',
        month: '4',
        country: '日本',
        cover: require('@/assets/zsjjtyclqdsn.webp'),
        season: '',
        endProgress: '26',
        episodes: '26',
        comment: '',
    },
    {
        name: '石纪元',
        alias: [],
        description: '',
        label: ['战斗', '科幻'],
        scoreLabel: ['反派剧情杀', '赶剧情', '续集无新内容'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/sjydej.webp'),
        season: '第二季',
        endProgress: '11',
        episodes: '11',
        comment: '',
    },
    {
        name: '回复术士的重来人生',
        alias: [],
        description: '',
        label: ['战斗', '勇者', '无敌', '冒险', '复仇'],
        scoreLabel: ['高开低走', '赶剧情', '重复性内容过多'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/hfssdclrs.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '无职转生：到了异世界就拿出真本事',
        alias: [],
        description: '',
        label: ['战斗', '恋爱', '无敌', '冒险', '日常', '异世界'],
        scoreLabel: ['天真男主', '微萎男'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/wzzsdlysjjnczbs.webp'),
        season: '',
        endProgress: '11',
        episodes: '11',
        comment: '',
    },
    {
        name: '工作细胞',
        alias: [],
        description: '',
        label: ['科普', '战斗'],
        scoreLabel: [],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/gzxbdej.webp'),
        season: '第二季',
        endProgress: '8',
        episodes: '8',
        comment: '',
    },
    {
        name: '工作细胞BLACK',
        alias: [],
        description: '',
        label: ['科普', '战斗'],
        scoreLabel: ['似露非露'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/gzxbblack.webp'),
        season: '',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
    {
        name: '五等分的新娘',
        alias: [],
        description: '',
        label: ['校园', '恋爱', '日常', '迟钝男'],
        scoreLabel: ['剧情拖沓', '续集无新内容'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/wdfdxndej.webp'),
        season: '第二季',
        endProgress: '7',
        episodes: '12',
        comment: '',
    },
    {
        name: '动物狂想曲 / BEASTARS',
        alias: [],
        description: '',
        label: ['战斗', '校园', '恋爱', '日常', '悬疑'],
        scoreLabel: ['反派剧情杀'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/dwkxqdej.webp'),
        season: '第二季',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '约定的梦幻岛',
        alias: [],
        description: '',
        label: ['战斗', '悬疑', '奇幻'],
        scoreLabel: ['高开低走', 'PPT', '赶剧情', '反派剧情杀', '剧情迷惑发展', '槽点过多'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/yddmhddej.webp'),
        season: '第二季',
        endProgress: '11',
        episodes: '11',
        comment: '',
    },
    {
        name: '关于我转生变成史莱姆这档事',
        alias: ['转生史莱姆'],
        description: '',
        label: ['搞笑', '战斗', '无敌', '后宫', '枯萎男', '异世界'],
        scoreLabel: ['高开低走', '主角智商欠缺', '剧情拖沓', '反派拉跨', '配角印象不深'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/gywzscslmzds.webp'),
        season: '第二季',
        endProgress: '24',
        episodes: '24',
        comment: '',
    },
    {
        name: '好比是最终迷宫前的少年到新手村生活一般的故事',
        alias: [],
        description: '',
        label: ['战斗', '无敌', '后宫', '枯萎男'],
        scoreLabel: ['高开低走', '下饭片', '反派拉跨', '配角印象不深'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/hbszzmgqdsndxscshybdgs.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '赛马娘',
        alias: [],
        description: '',
        label: ['竞技', '兽娘', '热血'],
        scoreLabel: ['似严非严', '槽点过多'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/smndej.webp'),
        season: '第二季',
        endProgress: '2',
        episodes: '13',
        comment: '',
    },
    {
        name: '超能力女儿',
        alias: [],
        description: '',
        label: ['日常', '搞笑', '黑帮', '战斗', '超能力'],
        scoreLabel: [],
        years: '2018',
        month: '4',
        country: '日本',
        cover: require('@/assets/cnlne.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '男子高中生的日常',
        alias: [],
        description: '',
        label: ['日常', '校园', '搞笑', '神经病'],
        scoreLabel: [],
        years: '2012',
        month: '1',
        country: '日本',
        cover: require('@/assets/nzgzsdrc.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '女高中生的虚度日常',
        alias: [],
        description: '',
        label: ['日常', '校园', '搞笑', '神经病'],
        scoreLabel: [],
        years: '2019',
        month: '7',
        country: '日本',
        cover: require('@/assets/nzgzsdxdrc.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '异界少女召唤术',
        alias: ['异世界魔王与召唤少女的奴隶魔术'],
        description: '',
        label: ['战斗', '无敌', '后宫', '异世界', '枯萎男', '杀必死'],
        scoreLabel: ['流水剧情', '配角印象不深', '很强但无脑谨慎', '叙事连贯性差'],
        years: '2021',
        month: '4',
        country: '日本',
        cover: require('@/assets/yjsnzhs.webp'),
        season: 'Ω',
        endProgress: '10',
        episodes: '10',
        comment: '',
    },
    {
        name: '如果究极进化的完全沉浸RPG比现实更垃圾的话',
        alias: ['如果究极进化的完全沉浸RPG比现实更可恶的话'],
        description: '',
        label: ['搞笑', 'RPG', '日常', '后宫', '枯萎男', '恶趣味', '傲娇妹'],
        scoreLabel: ['低成本', '似露非露', '叙事连贯性差'],
        years: '2021',
        month: '4',
        country: '日本',
        cover: require('@/assets/rgjjjhdwqcjrpgbxsgljdh.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '战斗员派遣中！',
        alias: [],
        description: '',
        label: ['搞笑', '战斗', '科技', '后宫', '杀必死'],
        scoreLabel: ['低成本', '无脑', '反派拉跨', '似露非露', '叙事连贯性差'],
        years: '2021',
        month: '4',
        country: '日本',
        cover: require('@/assets/zdypqz.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '月色真美',
        alias: [],
        description: '',
        label: [],
        scoreLabel: [''],
        waitToScore: true,
        years: '2017',
        month: '4',
        country: '日本',
        cover: require('@/assets/loading.gif'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '剑风传奇',
        alias: [],
        description: '',
        label: ['热血', '战斗', '冒险', '下饭'],
        scoreLabel: ['结尾不深刻'],
        years: '2016',
        month: '7',
        country: '日本',
        cover: require('@/assets/jfcqdej.jpg'),
        season: '第二季',
        endProgress: '24',
        episodes: '24',
        comment: '',
    },
    {
        name: '进击的巨人',
        alias: [],
        description: '艾伦巨人化，人类开始怀疑巨人的由来',
        label: ['热血', '战斗', '冒险'],
        scoreLabel: [],
        years: '2017',
        month: '4',
        country: '日本',
        cover: require('@/assets/jjdjrdej.jpg'),
        season: '第二季',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '不正经的魔术讲师与禁忌教典',
        alias: [],
        description: '',
        label: [],
        scoreLabel: [''],
        waitToScore: true,
        years: '2017',
        month: '4',
        country: '日本',
        cover: require('@/assets/loading.gif'),
        season: '',
        endProgress: '0',
        episodes: '12',
        comment: '',
    },
    {
        name: '埃罗芒阿老师',
        alias: ['情色漫画老师'],
        description: '',
        label: ['傲娇妹', '日常'],
        scoreLabel: [''],
        waitToScore: true,
        years: '2017',
        month: '4',
        country: '日本',
        cover: require('@/assets/loading.gif'),
        season: '',
        endProgress: '0',
        episodes: '12',
        comment: '',
    },
    {
        name: '如果有妹妹就好了',
        alias: ['如果能写小说就好了'],
        description: '',
        label: ['恋爱', '创作', '日常', '搞笑', '奋斗', '妹控', '杀必死'],
        scoreLabel: ['配角印象不深'],
        years: '2017',
        month: '10',
        country: '日本',
        cover: require('@/assets/rgymmjhl.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '转生成蜘蛛又怎样！',
        alias: [],
        description: '',
        label: ['无敌', 'RPG', '校园', '异世界'],
        scoreLabel: ['PPT', '迷惑分镜', '下饭片', '3D低成本', '剧情拖沓'],
        years: '2021',
        month: '1',
        country: '日本',
        cover: require('@/assets/zsczzyzy.webp'),
        season: '',
        endProgress: '24',
        episodes: '24',
        comment: '',
    },
    {
        name: '青梅竹马绝对不会输的恋爱喜剧',
        alias: [],
        description: '她只会冲我一个人偷偷地笑。对方可知白草是获得芥见赏的现役女高中生作家！而且还是个美少女！本人丸末晴作为一个普通的高中生与她实在是非常不相配这种事情我还是知道的！但是，还是觉得有戏，大概…啊不，...',
        label: ['恋爱', '日常', '后宫', '校园', '枯萎男'],
        scoreLabel: ['低成本', '下饭片', '迷惑片段', '叙事连贯性差'],
        years: '2021',
        month: '4',
        country: '日本',
        cover: require('@/assets/qmzmjdbhsdlaxj.webp'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: '带着智能手机闯荡异世界',
        alias: ['带着智慧型手机闯荡异世界'],
        description: '',
        label: ['无敌', '后宫', '枯萎男', '异世界', '杀必死'],
        scoreLabel: ['低成本', '下饭片', '反派逆天'],
        years: '2017',
        month: '7',
        country: '日本',
        cover: require('@/assets/dzznsjcdysj.jpg'),
        season: '',
        endProgress: '12',
        episodes: '12',
        comment: '',
    },
    {
        name: 'MEGALOBOX',
        alias: ['装甲重拳'],
        description: '',
        label: ['竞技', '机甲', '热血'],
        scoreLabel: ['反派拉跨'],
        years: '2021',
        month: '4',
        country: '日本',
        cover: require('@/assets/megalobox2.webp'),
        season: '第二季',
        endProgress: '13',
        episodes: '13',
        comment: '',
    },
]