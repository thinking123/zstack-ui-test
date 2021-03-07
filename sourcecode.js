//## source code

//init env

//create
/*l2:{
1.route to : network-service/vip/create
 page.goto('http://${baseUrl}/network-service/vip/create');
1.name:input [input]
 page.fill(selector,'xx')
2.desc:input [textarea]
page.fill(selector,'xx')
3.l3-type:select options-0
page.click(selector,'xx')
4.l3:select list-0
await page.click(selector,'xx')
5.show qos
6.iprange:select list-0
 await page.fill(selector,'xx')
7.specificIp:input
 await page.fill(selector,'xx')
if:show qos

8.qosPort:input
9:upband:input
10:upbandunit:select-0
11:downband:input
12:downbandunit:select-0

13:add qos button
page.click(selector,'xx')
14.qosPort:input
15:upband:input
16:upbandunit:select-0
17:downband:input
18:downbandunit:select-0
19:dump all create data:json
19:submit
page.click(selector,'xx')
}
*/
//query
/* use --create--
1.get create data
2. route to : network-service/vip
3.get total
4.get list--0
5.compare :create data === list--0
*/
//update
/*
1. use --create--
2.route to : network-service/vip
3.select list:0
4.click toolbar
5.select edit
6.show modal
7.name:input
8.desc:input [textarea]
9.submit
10. dismiss modal
11.click list:0
12.await route
13.get field:name
14.get field:desc
15.compare dump update to fields
*/
//delete
/*
1. use --create--
2.route to : network-service/vip
3.select list:0
4.click toolbar
5.select delete
6.show modal
7.submit
8.dismiss modal
9.await
10.get list total
*/