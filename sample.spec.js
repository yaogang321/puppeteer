describe('add todo', function () {
    let page;
    var count_global = 1;

    

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
      count_global = await page.$$eval('#main ul li',e=>{
        var dd = e.length;
        return dd;
      });
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      
      const expectInputContent = await page.evaluate(todoList => todoList.firstChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    })
    //删除todolist中的一个item
    it('should complete seccessfully', async function(){
      //TODO const todo_count = #todo-count > strong 获取其值 
      const _before = await page.$eval('#todo-count > strong',el => el.value);
      await page.click('#todo-list > li:nth-child(1) > div > input',{delay:50});//#todolist li:nth-child(1) 
      const _after = await page.$eval('#todo-count > strong',el => el.value);
      expect(_before).to.eql(_after);
    })

    //测试todolist中item的数量
    it('shoule get correct list',async function(){
      const c_list_length = await page.$$eval('#main ul li',e=>{
        var dd = e.length;
        return dd;
      });
      // console.log(c_list_length);
      expect(c_list_length).to.eql(count_global + 1);
    })
  });