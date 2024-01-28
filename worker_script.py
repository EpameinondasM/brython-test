from browser import bind, self

captured_output = []

print("Hi2")

def custom_print(*args, **kwargs):
    captured_output.append(' '.join(str(arg) for arg in args))

@bind(self, "message")
def execute_code(evt):
    user_code = evt.data
    print(user_code)
    original_print = __builtins__.print
    __builtins__.print = custom_print
    


    try:
        exec(user_code, globals())
        # Send back the captured output
        self.send("<br>".join(captured_output))
    except Exception as e:
        # Send back the error message
        self.send(str(e))

    __builtins__.print = original_print
