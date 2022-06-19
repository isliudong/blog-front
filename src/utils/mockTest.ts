import Mock from "mockjs";
import URLs from "./urls";

const DEBUG = false; // debug 总开关
/**
 * debug: false | true,
 * data: {}
 */
export interface data {
    debug: boolean;
    data: object;
}

const mockData: object = {
    getLineList: {
        debug: true,
        data: {
            status: "100",
            message: "操作成功",
            data: {
                count: "@natural(10, 100)",
                "list|7-10": [
                    {
                        date: '@date("MMdd")',
                        ringRatio: "@natural(10, 50)",
                        rate: "@natural(-10, 50)",
                        name: "@city",
                        rank: "@natural(1, 50)",
                        value: "@natural(1, 100)"
                    }
                ]
            }
        }
    },
    getClassroomInformList: {
        debug: true,
        data: {
            status: "100",
            message: "操作成功",
            data: {
                count: "@natural(10, 100000)",
                "list|1-10": [
                    {
                        id: "@natural(10, 100000)",
                        classroom_id: "@natural(10, 100000)",
                        student_id: "@natural(10, 100000)",
                        student_name: "@string",
                        user_name: "@string",
                        student_url: "//www.baidu.com/img/bd_logo1.png",
                        head_portrait: "//www.baidu.com/img/bd_logo1.png",
                        assignment_type: "@natural(1, 2)",
                        own: "@natural(10, 100000)",
                        article: "@string",
                        score: "@natural(10, 100000)",
                        integral: "@natural(10, 100000)",
                        time: "@natural(10, 100000)",
                        task_time: "@natural(10, 100000)",
                        "comment|1-10": [
                            {
                                id: "@natural(10, 100000)",
                                name: "@string",
                                comment: "@string"
                            }
                        ],
                        "seal|1-10": [
                            {
                                id: "@natural(10, 100000)",
                                user_id: "@natural(10, 100000)",
                                name: "@string",
                                colour: "@string",
                                style: "@string"
                            }
                        ]
                    }
                ]
            }
        }
    },
    getArticleList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                count: "@natural(10, 100000)",
                "list|1-10": [
                    {
                        category: "@string",
                        create_time: "@natural(10, 100000)",
                        year: "@natural(10, 100000)",
                        desc: "@natural(10, 100000)",
                        img_url: "//www.baidu.com/img/bd_logo1.png",
                        meta: {
                            views: "@natural(10, 100000)",
                            comments: "@natural(10, 100000)",
                            likes: "@natural(10, 100000)"
                        },
                        tags: "@string",
                        title: "@string",
                        id: "@natural(1, 100)",
                    }
                ]
            }

        }
    },
    getArticleDetail: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                toc: "123",
                id: "@natural(10, 100000)",
                author: "@string",
                category: ["@string"],
                comments: [],
                create_time: "@natural(10, 100000)",
                desc: "@string",
                content: "# SSM考核\n" +
                    "\n" +
                    "## 概述\n" +
                    "\n" +
                    "1. 本次考核内容为物料管理功能\n" +
                    "1. 本次考核时间为5天(含周末 20-08-01~20-08-05)\n" +
                    "1. 本次考核需要将所有业务要求考点都操作一遍，并录屏后转为gif文件，放至项目根目录中\n" +
                    "1. 本次考核完成后将项目提交给对应的指导教师，指导教师根据完成情况考核评分\n" +
                    "\n" +
                    "## 业务要求\n" +
                    "\n" +
                    "1. 完成一个物料管理页面\n" +
                    "1. 无需登录，打开系统即可使用\n" +
                    "1. 首页实现对物料数据的分页条件查询\n" +
                    "1. 点击新增按钮，出现新增物料功能弹框(或侧滑框)，录入必输字段和非必输字段后，点击保存，将录入的数据传入后台保存，同时自动生成ID和物料编号(规则为当前DB中ID最大的物料的物料编号 + 1)。保存成功后功能框关闭，同时主页自动重新执行一次查询。如果在保存之前点击关闭按钮，则直接关闭功能框\n" +
                    "1. 点击修改按钮，出现修改物料功能弹框(或侧滑框)，录入必输字段和非必输字段后，点击保存，将录入的数据传入后台保存，更新数据信息。注意需校验某些字段不能编辑(详见原型图)。保存成功后功能框关闭，同时主页自动重新执行一次查询。如果在保存之前点击关闭按钮，则直接关闭功能框\n" +
                    "1. 点击删除按钮，出现提示框[\"确认删除?\"]，点击是，将本条数据从DB中删除，同时自动重新执行一次查询。点击否则关闭提示框，不做任何操作\n" +
                    "\n" +
                    "## 扩展要求\n" +
                    "\n" +
                    "*此部分要求作为额外加分项，但总分不会超过满分(20分)。*\n" +
                    "\n" +
                    "1. 查询功能实现后端排序，既前端可以动态设置排序条件传至后端，后端根据条件动态拼接排序sql\n" +
                    "1. 实现勾选批量删除功能\n" +
                    "1. 实现Excel导出功能，导出的Excel字段及其值要求和页面上完全一样，所见即所得\n" +
                    "1. 后端实现hibernate validation(JSR-303)，防止前端恶意攻击。校验规则要求和数据库约束一致(必输、长度限制等)\n" +
                    "\n" +
                    "## 开发要求\n" +
                    "\n" +
                    "1. 使用`Spring + Spring MVC + Mybatis + JSP(或其他模板引擎)`。或者使用`React(Angular/Vue) + Spring boot web + Mybatis`。请注意只有这两种组合是允许的，其他组合**没有成绩**\n" +
                    "1. Mybatis的使用必须是使用`Mapper.java`接口+`Mapper.xml`写sql，其他用法Mybatis项目不得分\n" +
                    "1. 要求在代码中引入Service层做注解式数据库事务控制\n" +
                    "1. 严格按照alibaba代码规范开发，否则会出现扣分\n" +
                    "\n" +
                    "## 附件\n" +
                    "\n" +
                    "### 表设计\n" +
                    "\n" +
                    "```sql\n" +
                    "CREATE TABLE `ssm_item` (\n" +
                    "  `item_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '表ID，主键，供其他表做外键',\n" +
                    "  `item_code` varchar(60) COLLATE utf8mb4_bin NOT NULL COMMENT '物料编码',\n" +
                    "  `item_uom` varchar(60) COLLATE utf8mb4_bin NOT NULL COMMENT '物料单位',\n" +
                    "  `item_description` varchar(240) COLLATE utf8mb4_bin NOT NULL COMMENT '物料描述',\n" +
                    "  `start_active_date` date DEFAULT NULL COMMENT '生效起始时间',\n" +
                    "  `end_active_date` date DEFAULT NULL COMMENT '生效结束时间',\n" +
                    "  `enabled_flag` tinyint(1) NOT NULL DEFAULT '1' COMMENT '启用标识',\n" +
                    "  `object_version_number` bigint(20) NOT NULL DEFAULT '1' COMMENT '版本号',\n" +
                    "  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\n" +
                    "  `created_by` bigint(20) NOT NULL DEFAULT '-1',\n" +
                    "  `last_updated_by` bigint(20) NOT NULL DEFAULT '-1',\n" +
                    "  `last_update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,\n" +
                    "  PRIMARY KEY (`item_id`),\n" +
                    "  UNIQUE KEY `ssm_item_u1` (`item_code`),\n" +
                    "  KEY `ssm_item_n1` (`item_description`)\n" +
                    ") ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='物料';\n" +
                    "```\n" +
                    "\n" +
                    "### 原型图\n" +
                    "\n" +
                    "[原型图](./物料管理.rp)",
                img_url: "//www.baidu.com/img/bd_logo1.png",
                numbers: 0,
                keyword: ["@string"],
                like_users: ["@string"],
                meta: { views: "@natural(10, 100000)", likes: "@natural(10, 100000)", comments: "@natural(10, 100000)" },
                origin: 0,
                state: 1,
                tags: ["标签1","标签2"],
                title: "@string",
                update_time: "@natural(10, 100000)",
            }

        }
    },
    getTagList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                count: "@natural(10, 100000)",
                "list|1-10": [
                    {
                        name: "@string",
                        id: "@natural(1, 100)",
                    }
                ]
            }
        }
    },
    login: {
        debug: false,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    logout: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    register: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getUser: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    addComment: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    addThirdComment: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getCommentList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    likeArticle: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    addMessage: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getMessageList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getMessageDetail: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getLinkList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getCategoryList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getTimeAxisList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getTimeAxisDetail: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getProjectList: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
    getProjectDetail: {
        debug: true,
        data: {
            status: "200",
            code: 0,
            message: "操作成功",
            data: {
                id: "@natural(1, 1000)",
                name:"@string",
                avatar:"//www.baidu.com/img/bd_logo1.png",
            }
        }
    },
};

Mock.setup({
    timeout: 500
});
interface mockData{
    [index:string]:string;
}

const mockTest: Function = function (urls: object) {
    if (!DEBUG) {
        return false;
    }
    for (const key in mockData) {
        const mockDatum = mockData[key] ;
        if (mockDatum.debug && urls[key] !== undefined) {
            const mock = Mock.mock(RegExp('(?='+urls[key]+')'), mockData[key].data);
            console.log(urls[key])
            console.log(mockData[key].data)
            console.log("------------------")
        }
    }
};

mockTest(URLs);

/*const xhr = new XMLHttpRequest();
xhr.open('get', '/api/getArticleList');
xhr.send();
xhr.onload = () => {
    console.log('xhr', xhr);
}*/
