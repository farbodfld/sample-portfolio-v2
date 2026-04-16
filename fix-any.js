const fs = require('fs');
const files = [
  'components/admin/ProjectForm.tsx',
  'components/admin/SettingsForm.tsx',
  'components/admin/SkillsManager.tsx',
  'components/admin/ProjectsList.tsx',
  'components/admin/ProfileForm.tsx',
  'components/admin/ExperienceManager.tsx',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/catch \(err: any\)/g, 'catch (err: unknown)');
  content = content.replace(/err\.message/g, '(err as Error).message');
  fs.writeFileSync(file, content);
});
console.log('Fixed all files');
