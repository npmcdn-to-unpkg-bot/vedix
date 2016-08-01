-- #4 2013.11.11 12:00:00

CREATE TABLE IF NOT EXISTS `crs_session` (
  `session_id` int(11) NOT NULL COMMENT 'ИД сессии',
  `sessionid` char(32) COLLATE utf8_bin DEFAULT NULL COMMENT 'SESSIONID',
  `ip_id` int(11) NOT NULL,
  `ip` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'ИД пользователя',
  `group_id` int(11) DEFAULT NULL COMMENT 'ИД группы',
  `smgmt` int(11) DEFAULT NULL COMMENT 'Смещение по часовым поясам',
  `stime` datetime DEFAULT NULL COMMENT 'Дата и время первого обращения к сайту',
  `timeout` int(11) DEFAULT NULL COMMENT 'Срок действия сессии в секундах',
  `puttime` datetime DEFAULT NULL COMMENT 'Дата и время последнего обращения к страницам сайта',
  `isshowerror` tinyint(1) DEFAULT '0' COMMENT 'Признак - выводить сообщения об ошибках',
  `user_login` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `user_fullname` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `group_code` varchar(24) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL COMMENT 'null - удалён, 0 - забанен, 1 - Ok',
  `isbot` tinyint(1) DEFAULT NULL,
  `isbanned` tinyint(1) DEFAULT NULL,
  `regdate` datetime DEFAULT NULL,
  `agentname` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `http_referer` varchar(256) COLLATE utf8_bin DEFAULT NULL,
  `quanqr` int(11) NOT NULL DEFAULT '0' COMMENT 'Кол-во запросов к веб-серверу',
  `quanqr_sa` int(11) NOT NULL DEFAULT '0' COMMENT 'Кол-во запросов к серверу-приложений',
  UNIQUE KEY `session_id` (`session_id`),
  KEY `society_id` (`user_id`),
  KEY `group_id` (`group_id`),
  KEY `ip_id` (`ip_id`),
  KEY `sessionid` (`sessionid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Текущие сессии';