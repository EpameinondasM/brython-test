from browser import bind, document, worker, window


def onready(workerHello):
    # This function will be called when the worker is ready
    # Bind the message handler here
    #print(([x.value for x in user_code]))
    #user_code = document["pythonCode"].value
    #editor = window.codeEditor
    user_code = document["pythonCode"].value
    print(user_code)
    workerHello.send(user_code)
    window.setTimeout(lambda: workerHello.terminate(), 4000)  # 4000 milliseconds = 4 seconds
    
def run_code(test):
    worker.create_worker("worker1", onready, onmessage)
    #print(user_code)

def stop_execution(event):
    if event is not None:
        event.terminate()

def onmessage(message):
    output_div = document["output"]
    floating_output_div = document["bottomOutput"]
    program_output = message.data.strip()
    floating_output_div.innerHTML = program_output
    
    # Show the div
    floating_output_div.style.display = "block"
    floating_output_div.style.transform = "translate(-50%, -50%) scale(1)"
    

    # Hide after 3 seconds
    def hide_floating_output():
        floating_output_div.style.transform = "translate(-50%, -50%) scale(0)"

    # Set the timeout to hide the div after 3 seconds
    window.setTimeout(hide_floating_output, 3000)


    # Check if the output is correct
    #expected_output = 'Positive' if 5 > 0 else ('Negative' if 5 < 0 else 'Zero')
    expected_output = "5"
    if program_output == expected_output:
        output_div.innerHTML = f'<span style="color: green;">Correct!</span>'
        window.confetti()
    else:
        output_div.innerHTML = f'<span style="color: red;">Incorrect. Try again.</span>'
        output_div.classList.add("shake")  # Add 'shake' class to trigger the animation

        # Optionally, remove the class after the animation duration
        window.setTimeout(lambda: output_div.classList.remove("shake"), 1000)  # Assuming 1 second for shake duration

    # Append actual output
    output_div.innerHTML += f'<br><strong>Output:</strong><br>{program_output}'


#user_code = document["pythonCode"].value

document["runCode"].bind("click", run_code)
document["stopCode"].bind("click", stop_execution)

