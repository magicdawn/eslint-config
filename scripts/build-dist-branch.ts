/**
- name: pack targz
	run: pnpm pack

- name: prepare dist-branch content
	run: rm -rf ./dist-branch && mkdir -p ./dist-branch && tar -xzf *.tgz -C ./dist-branch --strip-components=1
 */
