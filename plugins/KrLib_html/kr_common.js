/*
  - kr_common.js - (HTML)
  ver.2026/04/05

  汎用的に使える機能。(<body>内の一番下に入れる)
*/

/* =============================== 
  ▼ コードブロック ▼
  html上で綺麗に記述できるように
================================ */
document.querySelectorAll("pre code").forEach(block => {
  const lines = block.textContent.split("\n");

  //先頭・末尾の空行を削除.
  while (lines[0]?.trim() === "") lines.shift();
  while (lines[lines.length - 1]?.trim() === "") lines.pop();

  //最小インデント取得(空行除外)
  const minIndent = Math.min(
    ...lines
      .filter(line => line.trim())
      .map(line => line.match(/^\s*/)[0].length)
  );

  //インデント削除.
  const trimmed = lines.map(line => line.slice(minIndent)).join("\n");

  block.textContent = trimmed;
});