# If the directory, `dist`, doesn't exist, create `dist`
stat dist || mkdir dist
# Archive artifacts
zip dist.zip -r dist package.json package-lock.json

eb deploy