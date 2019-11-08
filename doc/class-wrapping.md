# Es5 class wrapping

## Class declaration

```
class ClassName {
DECLARE_ES5_CLASS(ClassName, JSClassName);
	
public:
	static void init(Napi::Env env, Napi::Object exports);
	explicit ClassName(const Napi::CallbackInfo& info);
	~ClassName();
	
	void _destroy();
	
 private:
	JS_DECLARE_GETTER(ClassName, isDestroyed);
	
	JS_DECLARE_METHOD(ClassName, ClassName, destroy);
	
	bool _isDestroyed;
	
};
```

`DECLARE_ES5_CLASS` - adds utility declarations, the first argument
must be this class name, and the second argument will become the
name (arbitrary) of this function (constructor) in JS.

`init` - can be used to initialize this class and export it.

`JS_DECLARE_METHOD` - declares a method, the first argument is this class,
the second is the name of the method to be created.
`JS_DECLARE_GETTER` - declares a getter, the first argument is this class,
the second is the name of the getter to be created.
`JS_DECLARE_SETTER` - declares a setter, the first argument is this class,
the second is the name of the setter to be created.
