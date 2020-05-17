# Host: localhost  (Version: 5.7.26)
# Date: 2020-05-17 14:50:22
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "goodsinfo"
#

DROP TABLE IF EXISTS `goodsinfo`;
CREATE TABLE `goodsinfo` (
  `goodsId` varchar(10) NOT NULL,
  `goodsName` varchar(100) DEFAULT NULL,
  `typeId` char(3) NOT NULL,
  `goodsPrice` float DEFAULT NULL,
  `goodsCount` int(11) DEFAULT NULL,
  `goodsDesc` varchar(100) DEFAULT NULL,
  `goodsImg` varchar(100) DEFAULT NULL,
  `beiyong1` varchar(100) DEFAULT NULL,
  `beiyong2` varchar(100) DEFAULT NULL,
  `beiyong3` varchar(100) DEFAULT NULL,
  `beiyong4` varchar(100) DEFAULT NULL,
  `beiyong5` varchar(100) DEFAULT NULL,
  `beiyong6` varchar(100) DEFAULT NULL,
  `beiyong7` varchar(100) DEFAULT NULL,
  `beiyong8` varchar(100) DEFAULT NULL,
  `beiyong9` varchar(100) DEFAULT NULL,
  `beiyong10` varchar(100) DEFAULT NULL,
  `beiyong11` varchar(100) DEFAULT NULL,
  `beiyong12` varchar(100) DEFAULT NULL,
  `beiyong13` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`goodsId`),
  KEY `typeId` (`typeId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "goodsinfo"
#

/*!40000 ALTER TABLE `goodsinfo` DISABLE KEYS */;
INSERT INTO `goodsinfo` VALUES ('000','','001',11,100,'大图片','img/phone.jpg','','','','','','','','','','','','',''),('001','魅族 16T','001',1999,100,'6.5 英寸极边全面屏 | 骁龙 855 旗舰处理器','img/phone1.png','','','','','','','','','','','','',''),('002','魅族 16Xs','001',1499,100,'4800W AI三摄 | 屏下指纹','img/phone2.png','','','','','','','','','','','','',''),('003','魅族 16s Pro','001',2699,100,'骁龙 855 Plus  | 索尼 4800W  AI 三摄','img/phone3.png','','','','','','','','','','','','',''),('004','魅族 Note9','001',1199,100,'骁龙 675 | 后置 4800 万','img/phone4.png','','','','','','','','','','','','',''),('005','魅族 16s','001',2699,100,'骁龙 855 4800W 光学防抖','img/phone5.png','','','','','','','','','','','','',''),('006','魅族 16th','001',1698,100,'骁龙845 | 屏幕下指纹','img/phone6.png','￥2298','','','','','','','','','','','',''),('100','','002',11,100,'大图片','img/mzsx.jpg','','','','','','','','','','','','',''),('101','魅族 EP3C 耳机','002',129,100,'Hi-Res 认证高解析音质 | Type-C数字接口','img/sx_1.jpg','','','','','','','','','','','','',''),('102','魅族 POP2 真无线蓝牙耳机','002',399,100,'蓝牙5.0 | 单次8H续航 | 石墨烯振膜 | 双耳通话','img/sx_4.png','','','','','','','','','','','','',''),('103','魅族 HIFI 解码耳放','002',169,100,'高性能DAC芯片|纯净HiFi音质|600Ω高阻抗推力','img/sx_5.png','','热卖','','','','','','','','','','',''),('104','魅族 EP63NC 无线降噪耳机','002',399,100,'AMS 芯片智能降噪|Qualcomm apt-X™ 高清音质','img/sx_6.png','','热卖','','','','','','','','','','',''),('105','魅族 HiFi 解码耳放 PRO','002',269,100,'超强二级运放 | Hi-Res 认证高解析音质','img/sx_2.jpg','','','','','','','','','','','','',''),('106','魅族 EP52 Lite 蓝牙耳机','002',129,100,'生物纤维振膜|8小时续航|IPX5级防水|轻巧亲肤','img/sx_7.png','','','','','','','','','','','','',''),('107','魅族 EP2X 耳机','002',69,100,'一体式线控 | 3.5mm接口 |流线设计','img/sx_8.png','','','','','','','','','','','','',''),('108','魅族 EP21耳机','002',39,100,'三键一体式线控 | 3.5mm接口','img/sx_9.png','￥89','','','','','','','','','','','',''),('109','MEIZU UR 高端定制耳机  预约','002',200,100,'【预约专用】私人定制，为你而声','img/sx_3.jpg','','','','','','','','','','','','',''),('110','魅族蓝牙音频接收器','002',89,100,'独立音频芯片 | 一键控制 | 6小时续航 | 轻巧设计','img/sx_10.png','','','','','','','','','','','','',''),('111','魅族 LIVE 四单元动铁耳机','002',1099,100,'Knowles四动铁 双通道导音系统 现场级音乐表现','img/sx_11.png','￥1299','','','','','','','','','','','',''),('112','魅族 HALO 激光蓝牙耳机','002',499,100,'炫酷夜跑神器 随性张扬','img/sx_12.png','￥999','','','','','','','','','','','',''),('200','','003',11,100,'大图片','img/znpj.jpg','','','','','','','','','','','','',''),('201','快充电源适配器（UP0830S','003',69,100,'快速充电 安全无忧','img/zn_1.jpg','￥89','','','','','','','','','','','',''),('202','魅族 Type-C 数据线','003',49,100,'5A 大电流 | Type-C 接口 | 更快更方便','img/zn_3.png','','','','','','','','','','','','',''),('203','魅族 Type-C 游戏专用线','003',49,100,'Type-C 接口 | 5A大电流 | 弯头专为游戏设计','img/zn_4.png','','','','','','','','','','','','',''),('204','魅族中国红 Type-C 金属编织线','003',39,100,'Type-C 接口 | 3A大电流 | 耐磨编织材料','img/zn_5.png','','','','','','','','','','','','',''),('205','魅族无线充电器','003',99,100,'10W快速充电 无线即放即充','img/zn_2.jpg','','','','','','','','','','','','',''),('206','魅族 Micro USB 金属数据线','003',29,100,'USB2.0接口 | 支持2A快速充电','img/zn_6.png','','','','','','','','','','','','',''),('207','魅族 V8 高配版高透保护膜','003',19,100,'高透光率 助双眼捕捉每一颗像素的色彩','img/zn_7.png','','','','','','','','','','','','',''),('208','魅族 16T 亲肤壳膜套装','003',39,100,'亲肤亲近，安全防护','img/zn_8.png','','','','','','','','','','','','',''),('300','','004',11,100,'大图片','img/shzb.jpg','','','','','','','','','','','','',''),('301','魅族极简都市双肩包','004',179,100,'人体工学减负设计 | 大容量多功能收纳','img/sh_1.jpg','','','','','','','','','','','','',''),('302','Pandaer readnap T恤','004',199,100,'100％精织纯棉|多重潮流工艺|Mixcolor混色搭配','img/sh_3.png','','热卖','','','','','','','','','','',''),('303','Flyme 8 暗夜流光卫衣','004',269,100,'Flyme原创 | 镭射材料 | 随光而动 | 暗夜微光','img/sh_4.png','','','','','','','','','','','','',''),('304','Pandaer 魔术师帽衫','004',399,100,'Magic Pandaer前卫设计 | 潮流款式 挺括有型','img/sh_5.png','','','','','','','','','','','','',''),('305','Lifeme 梨木伞','004',499,100,'隔绝99% UV | 进口环保拒水涂层 | 千足纯银徽章','img/sh_2.jpg','','','','','','','','','','','','',''),('306','Pandaer 鼠年圆领卫衣','004',199,100,'金鼠限定/ 优质棉料 / 挺括亲肤 / 保暖舒适','img/sh_6.jpg','','','','','','','','','','','','',''),('307','2020福来我发新春大礼盒','004',399,100,'Flyme原创设计|鼠年春节套装|复古潮流|怀旧礼包','img/sh_7.png','','','','','','','','','','','','',''),('308','魅族声波电动牙刷刷头','004',59,100,'【两支装】进口杜邦刷毛 | 立体裁切贴合牙齿牙龈 | 顶部磨圆更舒适 | 紫外线UV杀菌','img/sh_8.png','','','','','','','','','','','','','');
/*!40000 ALTER TABLE `goodsinfo` ENABLE KEYS */;

#
# Structure for table "goodstype"
#

DROP TABLE IF EXISTS `goodstype`;
CREATE TABLE `goodstype` (
  `typeid` char(3) NOT NULL,
  `goodstype` varchar(20) NOT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "goodstype"
#

/*!40000 ALTER TABLE `goodstype` DISABLE KEYS */;
INSERT INTO `goodstype` VALUES ('001','手机'),('002','魅族声学'),('003','智能配件'),('004','生活周边');
/*!40000 ALTER TABLE `goodstype` ENABLE KEYS */;

#
# Structure for table "shoppingcart"
#

DROP TABLE IF EXISTS `shoppingcart`;
CREATE TABLE `shoppingcart` (
  `vipName` varchar(11) DEFAULT NULL,
  `goodsId` varchar(10) DEFAULT NULL,
  `goodsCount` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "shoppingcart"
#

/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;

#
# Structure for table "vip"
#

DROP TABLE IF EXISTS `vip`;
CREATE TABLE `vip` (
  `username` varchar(20) NOT NULL,
  `userpass` varchar(16) NOT NULL,
  `sex` char(2) DEFAULT '女',
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "vip"
#

/*!40000 ALTER TABLE `vip` DISABLE KEYS */;
INSERT INTO `vip` VALUES ('11111111111','111111','女',NULL),('rootaaa','111111','女',NULL);
/*!40000 ALTER TABLE `vip` ENABLE KEYS */;
