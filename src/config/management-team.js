import { img } from './oss'

// 管理团队统一配置：增减人员只需修改此数组。
export const managementTeam = [
  {
    name: '马天元',
    photo: img.tianyuan,
    pos: 'center 15%',
    role: 'AG电竞创始人 / SC电竞俱乐部创始人',
    tags: ['中国电竞开拓者', '名人堂入选者', '30年经验'],
    desc: '中国电竞历史上第一位获得电竞世界冠军的行业代表人物，对电竞俱乐部组建与产业发展拥有核心行业资源。',
  },
  {
    name: '李小刚',
    photo: img.xiaogang,
    pos: 'center 10%',
    role: 'SC俱乐部运营执行总裁',
    tags: ['星竞威武集团', '董事长助理', '纳斯达克上市'],
    desc: '武汉星竞威武集团「中国电竞第一股」（NPG），2024年7月纳斯达克上市。具备以上市为导向的集团化运作管理能力。',
  },
  {
    name: '张晖',
    photo: img.zhanghui,
    pos: 'center 10%',
    role: 'Doud AI超级视频工厂创始人',
    tags: ['原字节跳动', '商务BD', '3.5亿+曝光'],
    desc: '原字节跳动商务BD，参与运营清华大学「乡村振兴领头雁」计划。作品累计曝光超3.5亿次。',
  },
]

const desktopColumns = Math.min(Math.max(managementTeam.length, 1), 4)

export const managementTeamGridClass = {
  1: 'xl:grid-cols-1 xl:max-w-sm xl:mx-auto',
  2: 'xl:grid-cols-2 xl:max-w-3xl xl:mx-auto',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
}[desktopColumns]
