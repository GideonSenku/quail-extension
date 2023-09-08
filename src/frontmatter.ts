import dayjs from "dayjs";

function emptyFrontmatter() {
  const now = dayjs();
  return `---
slug: "INSERT_YOUR_SLUG_HERE"
datetime: "${now.format("YYYY-MM-DD HH:mm")}"
summary: "INSERT_YOUR_SUMMARY_HERE"
tags: "INSERT_YOUR_TAGS_HERE"
cover_image_url: ""
---\n\n`;
}

export default {
  emptyFrontmatter,
};