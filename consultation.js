import axios from 'axios'
import { apiConfig } from '../config/api.js'

// 创建axios实例
const consultationHttp = axios.create({
  baseURL: `${apiConfig.baseURL}/consultation`,
  timeout: apiConfig.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器
consultationHttp.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('问诊API错误:', error)
    return Promise.reject(error)
  }
)

// 19题硬编码问诊问题
const hardcodedQuestions = [
  {
    id: 1,
    text: "您认为自己的睡眠状况如何？",
    type: "单选",
    category: "睡眠质量",
    options: [
      { value: "好", label: "好", score: 0 },
      { value: "一般", label: "一般", score: 1 },
      { value: "较差", label: "较差", score: 2 }
    ]
  },
  {
    id: 2,
    text: "通常情况下，您从上床准备睡觉到真正入睡需要多长时间？",
    type: "单选",
    category: "入睡时间",
    options: [
      { value: "5分钟以内", label: "5分钟以内", score: 0 },
      { value: "6-15分钟", label: "6-15分钟", score: 1 },
      { value: "16-30分钟", label: "16-30分钟", score: 2 },
      { value: "31-60分钟", label: "31-60分钟", score: 3 },
      { value: "60分钟以上", label: "60分钟以上", score: 4 }
    ]
  },
  {
    id: 3,
    text: "过去一个月内，您每天夜间睡眠时间有多长？",
    type: "单选",
    category: "睡眠时长",
    options: [
      { value: "8小时及以上", label: "8小时及以上", score: 0 },
      { value: "7-8小时", label: "7-8小时", score: 1 },
      { value: "6-7小时", label: "6-7小时", score: 2 },
      { value: "5-6小时", label: "5-6小时", score: 3 },
      { value: "5小时以下", label: "5小时以下", score: 4 }
    ]
  },
  {
    id: 4,
    text: "过去一个月内，您夜间平均醒来的次数大约是？",
    type: "单选",
    category: "夜醒次数",
    options: [
      { value: "几乎不醒来", label: "几乎不醒来", score: 0 },
      { value: "1次", label: "1次", score: 1 },
      { value: "2-3次", label: "2-3次", score: 2 },
      { value: "4次及以上", label: "4次及以上", score: 3 }
    ]
  },
  {
    id: 5,
    text: "您有怎样的睡眠困扰？（多选）",
    type: "多选",
    category: "睡眠困扰",
    options: [
      { value: "反复清醒", label: "反复清醒", score: 1 },
      { value: "整夜做梦", label: "整夜做梦", score: 1 },
      { value: "晨起疲乏", label: "晨起疲乏", score: 1 },
      { value: "难以入睡", label: "难以入睡", score: 1 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 6,
    text: "您是否经常精神压力大/情绪紧张？",
    type: "单选",
    category: "精神状态",
    options: [
      { value: "是", label: "是", score: 2 },
      { value: "否", label: "否", score: 0 }
    ]
  },
  {
    id: 7,
    text: "您近期有无如下问题？",
    type: "多选",
    category: "身体症状",
    options: [
      { value: "时有耳鸣", label: "时有耳鸣", score: 1 },
      { value: "时发痔疮，肛周瘙痒", label: "时发痔疮，肛周瘙痒", score: 1 },
      { value: "腹胀/腹部不适", label: "腹胀/腹部不适", score: 1 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 8,
    text: "您是否经常周身酸痛/脊柱疼痛？",
    type: "单选",
    category: "疼痛症状",
    options: [
      { value: "是", label: "是", score: 2 },
      { value: "否", label: "否", score: 0 }
    ]
  },
  {
    id: 9,
    text: "您近期有无如下问题？",
    type: "多选",
    category: "特殊症状",
    options: [
      { value: "夜间憋醒/胸闷，心跳加速", label: "夜间憋醒/胸闷，心跳加速", score: 2 },
      { value: "皮肤瘙痒，发疹麻疹", label: "皮肤瘙痒，发疹麻疹", score: 1 },
      { value: "咳嗽/气短/喘促等", label: "咳嗽/气短/喘促等", score: 1 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 10,
    text: "您是否接触电子产品超过3小时/天？",
    type: "单选",
    category: "生活习惯",
    options: [
      { value: "是", label: "是", score: 1 },
      { value: "否", label: "否", score: 0 }
    ]
  },
  {
    id: 11,
    text: "您近期有无如下问题？",
    type: "多选",
    category: "中医症状",
    options: [
      { value: "面色暗黑，无精打采", label: "面色暗黑，无精打采", score: 2 },
      { value: "容易受惊，害怕", label: "容易受惊，害怕", score: 2 },
      { value: "夜间盗汗", label: "夜间盗汗", score: 2 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 12,
    text: "您是否劳心耗神过度？",
    type: "单选",
    category: "精神消耗",
    options: [
      { value: "是", label: "是", score: 2 },
      { value: "否", label: "否", score: 0 }
    ]
  },
  {
    id: 13,
    text: "您近期有无如下问题？",
    type: "多选",
    category: "肾虚症状",
    options: [
      { value: "腰酸无力", label: "腰酸无力", score: 2 },
      { value: "身寒怕冷", label: "身寒怕冷", score: 2 },
      { value: "夜尿频繁", label: "夜尿频繁", score: 2 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 14,
    text: "您是否用脑过度？",
    type: "单选",
    category: "用脑过度",
    options: [
      { value: "是", label: "是", score: 2 },
      { value: "否", label: "否", score: 0 }
    ]
  },
  {
    id: 15,
    text: "您近期有无如下问题？",
    type: "多选",
    category: "认知功能",
    options: [
      { value: "好忘事，记忆力下降", label: "好忘事，记忆力下降", score: 2 },
      { value: "白天嗜睡", label: "白天嗜睡", score: 1 },
      { value: "偏头痛/头痛", label: "偏头痛/头痛", score: 2 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 16,
    text: "您是否服用过以下类药物？（多选）",
    type: "多选",
    category: "用药史",
    options: [
      { value: "苯二氮卓类：地西泮、劳拉西泮", label: "苯二氮卓类：地西泮、劳拉西泮", score: 1 },
      { value: "非苯二氮卓类：唑吡坦、右佐匹克隆", label: "非苯二氮卓类：唑吡坦、右佐匹克隆", score: 1 },
      { value: "褪黑素受体激动剂：雷美替胺", label: "褪黑素受体激动剂：雷美替胺", score: 1 },
      { value: "食欲素受体拮抗剂：苏沃雷生", label: "食欲素受体拮抗剂：苏沃雷生", score: 1 },
      { value: "抗抑郁药物：曲唑酮、米氮平", label: "抗抑郁药物：曲唑酮、米氮平", score: 2 },
      { value: "无", label: "无", score: 0 }
    ]
  },
  {
    id: 17,
    text: "如果服用过安眠药，大概多长时间？",
    type: "单选",
    category: "用药时长",
    options: [
      { value: "从未服用", label: "从未服用", score: 0 },
      { value: "1个月以内", label: "1个月以内", score: 1 },
      { value: "1-6个月", label: "1-6个月", score: 2 },
      { value: "半年以上", label: "半年以上", score: 3 }
    ]
  },
  {
    id: 18,
    text: "请选择您的舌象特征（请对镜观察）：",
    type: "单选",
    category: "舌象",
    options: [
      { value: "淡红舌苔薄白", label: "淡红舌苔薄白", score: 0 },
      { value: "淡胖舌", label: "淡胖舌", score: 1 },
      { value: "红舌少苔", label: "红舌少苔", score: 2 },
      { value: "红舌少津", label: "红舌少津", score: 2 },
      { value: "淡胖舌苔白", label: "淡胖舌苔白", score: 1 },
      { value: "暗红舌或有瘀点", label: "暗红舌或有瘀点", score: 2 },
      { value: "紫暗舌有瘀斑", label: "紫暗舌有瘀斑", score: 3 },
      { value: "不清楚/跳过", label: "不清楚/跳过", score: 0 }
    ]
  }
]

// 获取19题硬编码问诊
export const getQuestions = async () => {
  try {
    return {
      success: true,
      data: hardcodedQuestions,
      total_questions: hardcodedQuestions.length
    }
  } catch (error) {
    console.error('获取问题失败:', error)
    throw new Error('无法获取问诊问题，请重试')
  }
}

// 提交问卷答案并获取诊断结果
export const submitQuestionnaireAnswers = async (answers) => {
  try {
    // 调用诊断API
    const diagnosisHttp = axios.create({
      baseURL: `${apiConfig.baseURL}/diagnosis`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const response = await diagnosisHttp.post('/analyze', {
      answers: answers,
      patient_id: 'patient-' + Date.now()
    })
    
    // 保存诊断结果到本地存储
    if (response.success) {
      localStorage.setItem('latestDiagnosis', JSON.stringify(response.data))
      localStorage.setItem('latestDiagnosisTime', new Date().toISOString())
    }
    
    return response
    
  } catch (error) {
    console.error('提交问卷失败:', error)
    throw new Error('诊断分析失败，请重试')
  }
}

export default { getQuestions, submitQuestionnaireAnswers }