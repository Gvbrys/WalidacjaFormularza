$(document).ready(function () {
    $.validator.addMethod("zst", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9._-]+)@zst\.radom\.pl$/.test(value);
    },);

    $("#signupForm").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true,
                zst: true
            },
            topics: {
                required: function () {
                    return $("#newsletter").is(":checked");
                },
                minlength: 2
            },
            agree: "required"
        },
        messages: {
            firstname: "To pole jest wymagane.",
            lastname: "To pole jest wymagane.",
            username: {
                required: "Proszę podać nazwę użytkownika.",
                minlength: "Nazwa użytkownika musi zawierać co najmniej 2 znaki."
            },
            password: {
                required: "Proszę podać hasło.",
                minlength: "Hasło musi zawierać co najmniej 5 znaków."
            },
            confirm_password: {
                required: "Proszę potwierdzić hasło.",
                minlength: "Hasło musi zawierać co najmniej 5 znaków.",
                equalTo: "Proszę wpisać takie samo hasło jak powyżej."
            },
            email: {
                required: "Proszę podać adres e-mail.",
                email: "Proszę podać poprawny adres e-mail.",
                zst: "Jedynie adresy e-mail o domenie zst.radom.pl są dozwolone."
            },
            agree: "Proszę zaakceptować naszą politykę.",
            topics: ""
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "topics") {
                $("#topicsError").show();
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label, element) {
            if ($(element).attr("name") === "topics") {
                if ($("input[name='topics']:checked").length >= 2) {
                    $("#topicsError").hide();
                }
            }
        }
    });

    const newsletter = $("#newsletter");
    const topicsSection = $("#topicsSection");

    newsletter.change(function () {
        if (this.checked) {
            topicsSection.removeClass("hide");
        } else {
            topicsSection.addClass("hide");
            topicsSection.find("input").prop("checked", false);
            $("#topicsError").hide();
        }
    });

    $("input[name='topics']").change(function () {
        if ($("input[name='topics']:checked").length >= 2) {
            $("#topicsError").hide();
        } else {
            $("#topicsError").show();
        }
    });
});
