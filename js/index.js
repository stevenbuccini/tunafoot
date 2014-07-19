
   Parse.initialize("ZvuYGWmttHsaBJ0UDvxK76s7cstAwNRzh4SYDDLV", "KmJ694MObD0g26KVUyF2L8esD1MwTR76hMWJhfUA");
    
    var TestObject = Parse.Object.extend("TestObject");
    var testObject = new TestObject();
      testObject.save({foo: "bar"}, {
      success: function(object) {
        $(".success").show();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });
