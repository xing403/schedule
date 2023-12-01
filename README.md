<div align="center">
  <img src="./public/256x256.png" align="center" width="200" />
</div>
<h3 align="center">Schedule</h3>


<div style="text-align: center">
  <a href="./README.zh-CN.md">中文</a> | <span>English</span>
</div>

A Schedule Tools, You can create a scheduled task by using the cron string
> home

![index page](./docs/banner1.png)

> create schedule

![index page](./docs/banner2.png)

## Schedule type
> `script`(Will be abolished)

still in the testing phase, you can only execute simple JavaScript code.

## `Schedule directive`
default directive can be executed by setting the key
**for example**

```yaml
key: date-time
args:
  format: YYYY-MM-DD HH:mm:ss
```
You can get the current time and display it through notifications. [more directives](./docs/directive.md)

## Usage
> need
* node >= 16.*
* typescript >= 5.1.3
* pnpm >= 8.6.0

### install
```shell
pnpm i
```
### run
```sh
pnpm dev
```
### build
```sh
pnpm build
```
