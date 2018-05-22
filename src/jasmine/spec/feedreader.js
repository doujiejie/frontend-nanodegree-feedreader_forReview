/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        function notEmpty(methodName) {
            allFeeds.forEach(function(feed) {
                expect(methodName).toBeDefined();
                expect(methodName.length).not.toBe(0);
            })
        }
        it('URLs are not empty', function() {
            notEmpty('feed.url');
            // 检查 URL 格式是否正确的正规表达式
            var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
            allFeeds.forEach(function(feed) {
                // expect(feed.url).toBeDefined();
                // expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(regularExpressionUrl);
            })
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are not empty', function() {
            notEmpty('feed.name');
            // allFeeds.forEach(function(feed) {
            //     expect(feed.name).toBeDefined();
            //     expect(feed.name.length).not.toBe(0);
            // })
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menuHidden = document.getElementsByClassName('menu-hidden');
        var menuIcon = document.getElementsByClassName('menu-icon-link');
        var body = document.getElementsByTagName('body');
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu hidden', function() {
            expect(menuHidden.length).toBe(1);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menuIcon click', function() {
            menuIcon[0].click();
            expect(menuHidden.length).toBe(0)
            menuIcon[0].click();
            expect(menuHidden.length).toBe(1);
        });
    })
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var container = $('.feed');
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        })

        it('loadFeed worked', function() {
            expect(container.children()).not.toBe(0);
        })

    })
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var container1;
        var container2;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(1, function() { // 匿名函数，当loadFeed返回数据后执行
                // 在此处获取内容1
                container1 = $('.feed').html();
                // 获取完毕后开始请求新的数据
                loadFeed(0, function() {
                    // 在此处获取内容2
                    container2 = $('.feed').html();
                    // 执行done，通知下方it开始测试
                    done();
                });
            });
        });

        it('content changes when a new feed is loaded', function() {
            expect(container1).not.toBe(container2);
        })
    })
}());