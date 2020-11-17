<template>
    <div id="app">
        <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
        <student-table v-bind:students="students"
                       v-on:student-arrived-or-left="studentArrivedOrLeft"
                       v-on:delete-student="studentDeleted"></student-table>
        <student-message v-bind:student="mostRecentStudent"></student-message>
    </div>
</template>

<script>
    import NewStudentForm from "@/components/NewStudentForm";
    import StudentTable from "@/components/StudentTable";
    import StudentMessage from "@/components/StudentMessage";

    export default {
        name: 'App',
        components: {
            NewStudentForm,
            StudentTable,
            StudentMessage
        },
        data() {
            return {
                students: [],
                mostRecentStudent: {}
            }
        },
        mounted() {
            this.updateStudents()
        },
        methods: {
            newStudentAdded(student) {
                this.$student_api.addStudent(student)
                    .then( student => {
                        this.updateStudents()
                    })
                    .catch( err => {
                        let msg = err.response.data.join(', ');
                        alert('Error adding student.\n' + msg);
                    })
            },
            studentArrivedOrLeft(student, present) {
                student.present = present
                this.$student_api.updateStudent(student).then( () => {
                    this.mostRecentStudent = student
                    this.updateStudents()
                })
            },
            studentDeleted(student) {
                this.$student_api.deleteStudent(student.id).then( () => {
                    this.updateStudents()
                    this.mostRecentStudent = {}     // clears welcome/goodbye messages
                })
            },
            updateStudents() {
                this.$student_api.getAllStudents().then( (students) => {
                    this.students = students
                })
            }
        }
    }
</script>

<style>

</style>
