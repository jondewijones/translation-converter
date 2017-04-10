(function() {

    // capture DOM elements
    var input = document.getElementById('input');
    var inputLabel = document.getElementById('input-label');
    var englishOutput = document.getElementById('english-output');
    var welshOutput = document.getElementById('welsh-output');
    var inputForm  = document.getElementById('input-form');

    // add event listener to handle form submission
    inputForm.addEventListener('submit', handleSubmit);



    // handleSubmit - display errors or render output
    function handleSubmit(event) {
        event.preventDefault();

        if (validateForm()) {
            input.className = "";
            inputLabel.className = "";
            renderOutput(scrollToResult());
        } else {
            input.className += " error";
            inputLabel.className += " error";
        }

    }



    function renderOutput(scrollToOutput) {
        var output = createOutput();
        englishOutput.innerHTML = output.english;
        welshOutput.innerHTML = output.welsh;
        if (scrollToOutput) {
            scrollToOutput();
        }
    }


    function createOutput() {
        var inputValue = input.value;
        var translation = [];
        var english = [];
        var welsh = [];
        var inputValuesByLine = inputValue.split(/\n/g);

        for (var i = 0; i < inputValuesByLine.length; ++i ) {

            // split lines of input by pipe
            translation = inputValuesByLine[i].split('|');

            // create a variable/placeholder name - replace spaces with hyphens,
            // remove punctuation and lower case any caps
            var placeholder = translation[0].split(' ').join('-').toLowerCase();
            placeholder =  placeholder.replace(/[^a-zA-Z0-9\- ]/g, "");

            // store placeholder and relevant translation in relevant array
            english[i] = placeholder + "=" + (translation[0] ? translation[0] : "");
            welsh[i] = placeholder + "=" + (translation[1] ? translation[1] : "");
        }

        // convert arrays to strings separated by new lines
        english = english.join('\n');
        welsh = welsh.join('\n');

        return output = {english: english, welsh: welsh};

    }

    function scrollToResult() {
        var position = document.getElementById('submit').offsetTop;
        window.scrollTo(0, position);
    }

    function validateForm() {
        var inputValue = document.getElementById('input').value;

        if (inputValue.length == 0) {
            return false;
        }
        return true;
    }

})();
