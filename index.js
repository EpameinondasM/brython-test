   window.addEventListener("load", function () {
        require.config({
          paths: {
            vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs",
          },
        });

        require(["vs/editor/editor.main"], function () {
          monaco.editor.defineTheme("myCustomTheme", {
            base: "vs-dark", // can also be vs-dark, hc-black
            inherit: true, // can also be false to completely replace the base theme
            rules: [
              // Set the styling rules here, for example:
              {
                token: "comment",
                foreground: "ffa500",
                fontStyle: "italic underline",
              },
              { token: "keyword", foreground: "569cd6" },
              // More rules...
            ],
            colors: {
              "editor.background": "#1E1E1E", // Use a slightly lighter dark background
              "editor.lineHighlightBackground": "#2c2c2d", // Slightly different line highlight background
              "editorLineNumber.foreground": "#858585", // Line number color
              "editor.selectionBackground": "#264f78", // Selection color
              // More color settings...
            },
          });
          var editor = monaco.editor.create(
            document.getElementById("monacoEditor"),
            {
              language: "python",
              theme: "myCustomTheme",
              lineHeight: 20,
              scrollBeyondLastLine: false,
            }
          );

          var textarea = document.getElementById("pythonCode");
          editor.getModel().setValue(textarea.value);

          // Sync Monaco content back to textarea for form submission
          editor.onDidChangeModelContent(function () {
            textarea.value = editor.getValue();
          });
        });
      });

      // Function to trigger animations based on execution results
      function triggerAnimations() {
        const outputDiv = document.getElementById("output");
        if (outputDiv.getAttribute("data-error") === "true") {
          outputDiv.classList.add("shake");
          setTimeout(() => {
            outputDiv.classList.remove("shake");
            outputDiv.removeAttribute("data-error");
          }, 500); // Duration of the shake animation
        }
      }

      // Bind the triggerAnimations function to the Run Code button click event
      document
        .getElementById("runCode")
        .addEventListener("click", triggerAnimations);

      // Function to show/hide the hint
      document
        .getElementById("showHint")
        .addEventListener("click", function () {
          var hintDiv = document.getElementById("hint");
          hintDiv.classList.toggle("d-none"); // Toggle visibility of the hint
        });

      document
        .getElementById("toggleVideoBtn")
        .addEventListener("click", function () {
          var videoSection = document.getElementById("collapseVideo");
          if (videoSection.classList.contains("show")) {
            videoSection.classList.remove("show");
          } else {
            videoSection.classList.add("show");
          }
        });

      // JavaScript to toggle the theory sidebar
      //document
      //  .getElementById("toggleTheoryBtn")
      //  .addEventListener("click", function () {
      //   var theoryPanel = document.getElementById("theoryPanel");
      //    theoryPanel.classList.toggle("expanded"); // Toggle the 'expanded' class to open/close the sidebar
      //  });

      document
        .getElementById("theoryTab")
        .addEventListener("click", function () {
          var theoryPanel = document.getElementById("theoryPanel");
          var theoryTab = document.getElementById("theoryTab");

          theoryPanel.classList.toggle("expanded");

          // Toggle a class on the theory tab to indicate expanded state
          theoryTab.classList.toggle("is-expanded");
        });