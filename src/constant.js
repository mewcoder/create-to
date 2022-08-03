const typeList = [
  { name: '空项目', value: 'empty' },
  { name: '@vue/cli4', value: 'vuecli4' },
  { name: '@vue/cli5', value: 'vuecli5' },
  { name: 'create-vue@2', value: 'vue2' },
  { name: 'create-vue@3', value: 'vue3' },
  { name: 'vite', value: 'vite' },
];

export const promptList = [
  {
    name: 'name',
    message: '请输入项目名称:',
    validate: () => true
  },
  {
    type: 'list',
    name: 'type',
    message: '请选择项目类型:',
    choices: typeList
  }
];
