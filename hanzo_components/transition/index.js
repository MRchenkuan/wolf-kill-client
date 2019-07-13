import transition from "./transition";

Component({
  behaviors: [transition],
  // 外部样式需要版本1.9.90支持
  externalClasses: ['extend-class'],
  options: {
      addGlobalClass: true,
  },
});
