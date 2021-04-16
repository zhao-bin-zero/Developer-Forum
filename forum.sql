/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : forum

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 16/04/2021 20:16:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `enjoy` int NOT NULL,
  `view` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content_html` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isPublished` tinyint NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int NULL DEFAULT NULL,
  `tag_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  INDEX `FK_fae0bad5f06a58f3d2b68e37f11`(`user_id`) USING BTREE,
  INDEX `FK_43dc2fa69a4739ce178e021d649`(`tag_id`) USING BTREE,
  CONSTRAINT `FK_43dc2fa69a4739ce178e021d649` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_fae0bad5f06a58f3d2b68e37f11` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'JS葵花宝典秘籍笔记，为你保驾护航金三银四', '前端葵花宝典秘籍，为你保驾护航金三银四', 10, 24, '内容1', '内容html1', 1, '2021-04-11 12:22:27.731639', '2021-04-16 12:01:46.330302', 1, 1);

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event`  (
  `eventname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of event
-- ----------------------------

-- ----------------------------
-- Table structure for events_users
-- ----------------------------
DROP TABLE IF EXISTS `events_users`;
CREATE TABLE `events_users`  (
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`) USING BTREE,
  INDEX `IDX_df93e44b48c1545c0795a11543`(`user_id`) USING BTREE,
  INDEX `IDX_6bce6dc80ee8e9f5a960e96eb3`(`event_id`) USING BTREE,
  CONSTRAINT `FK_6bce6dc80ee8e9f5a960e96eb35` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_df93e44b48c1545c0795a115435` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of events_users
-- ----------------------------

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_experssion` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限表达式',
  `permission_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限描述',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`permission_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for pin
-- ----------------------------
DROP TABLE IF EXISTS `pin`;
CREATE TABLE `pin`  (
  `pin_id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `reply_user_id` int NOT NULL DEFAULT 0,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`pin_id`) USING BTREE,
  INDEX `FK_c77615ca1e1a5df4f16b740a246`(`user_id`) USING BTREE,
  CONSTRAINT `FK_c77615ca1e1a5df4f16b740a246` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pin
-- ----------------------------
INSERT INTO `pin` VALUES (7, '留言1', 0, '2021-04-16 18:20:41.530144', '2021-04-16 18:20:41.530144', 1);
INSERT INTO `pin` VALUES (8, '留言2', 0, '2021-04-16 18:20:46.726521', '2021-04-16 18:20:46.726521', 1);
INSERT INTO `pin` VALUES (9, '留言3', 0, '2021-04-16 18:20:56.146883', '2021-04-16 18:20:56.146883', 1);
INSERT INTO `pin` VALUES (10, '留言4', 0, '2021-04-16 18:23:15.303007', '2021-04-16 18:23:15.303007', 1);
INSERT INTO `pin` VALUES (11, '留言5', 0, '2021-04-16 18:24:04.390084', '2021-04-16 18:24:04.390084', 1);
INSERT INTO `pin` VALUES (12, '留言7', 0, '2021-04-16 18:24:54.569613', '2021-04-16 18:24:54.569613', 1);
INSERT INTO `pin` VALUES (13, '留言6', 0, '2021-04-16 18:28:18.365132', '2021-04-16 18:28:18.365132', 1);
INSERT INTO `pin` VALUES (14, '留言8', 0, '2021-04-16 18:41:48.264399', '2021-04-16 18:41:48.264399', 1);
INSERT INTO `pin` VALUES (15, '留言9', 0, '2021-04-16 18:44:37.692028', '2021-04-16 18:44:37.692028', 1);
INSERT INTO `pin` VALUES (16, '留言10', 0, '2021-04-16 18:45:07.536530', '2021-04-16 18:45:07.536530', 1);
INSERT INTO `pin` VALUES (17, '留言11', 0, '2021-04-16 18:46:04.686174', '2021-04-16 18:46:04.686174', 1);
INSERT INTO `pin` VALUES (18, '留言12', 0, '2021-04-16 18:48:45.299786', '2021-04-16 18:48:45.299786', 1);
INSERT INTO `pin` VALUES (19, '留言13', 0, '2021-04-16 18:49:20.286066', '2021-04-16 18:49:20.286066', 1);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tagname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`tag_id`) USING BTREE,
  UNIQUE INDEX `IDX_c2d8a0e4594d7ea5ac57e397ce`(`tagname`) USING BTREE,
  UNIQUE INDEX `IDX_e0cf218e2ffd1c420b50072c28`(`nickname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (1, 'frontend', '前端', '2021-04-11 12:45:32.093819', '2021-04-11 15:11:28.094910');
INSERT INTO `tag` VALUES (2, 'backend', '后端', '2021-04-11 12:45:32.093819', '2021-04-11 15:11:32.154812');
INSERT INTO `tag` VALUES (3, 'android', '安卓', '2021-04-11 12:45:32.093819', '2021-04-11 15:11:35.055591');
INSERT INTO `tag` VALUES (4, 'ios', 'ios', '2021-04-11 12:45:32.093819', '2021-04-11 15:11:38.059993');
INSERT INTO `tag` VALUES (5, 'ai', '人工智能', '2021-04-11 12:45:32.093819', '2021-04-11 15:11:45.084458');
INSERT INTO `tag` VALUES (6, 'freebie', '开发工具', '2021-04-11 12:45:32.093819', '2021-04-11 15:13:01.134296');
INSERT INTO `tag` VALUES (7, 'career', '代码人生', '2021-04-11 12:45:32.093819', '2021-04-11 15:12:45.236292');
INSERT INTO `tag` VALUES (8, 'read', '阅读', '2021-04-11 12:45:32.093819', '2021-04-11 15:12:31.152610');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin1', 'admin1', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2021-04-11 12:20:10.802534', '2021-04-14 18:34:52.315509');
INSERT INTO `user` VALUES (2, 'admin2', 'admin2', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2021-04-11 12:20:11.239898', '2021-04-14 18:34:53.234336');
INSERT INTO `user` VALUES (3, 'admin3', 'admin3', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', '2021-04-11 12:20:11.330055', '2021-04-14 18:34:56.984016');

SET FOREIGN_KEY_CHECKS = 1;
