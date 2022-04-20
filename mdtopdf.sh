find ./ -iname "*.md" -type f -exec sh -c 'pandoc --pdf-engine=wkhtmltopdf "${0}" -o "${0%.md}.pdf"' {} \;
