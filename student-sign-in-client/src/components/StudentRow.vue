<template>
    <tr v-bind:class="student.present ? 'present' : 'absent'">
        <td>{{student.name}}</td>
        <td>{{student.starID}}</td>
        <!-- removed the v-model so that the child component does not change the prop-->
        <td><input type="checkbox"
                   v-bind:checked="student.present"
                   v-on:change="arrivedOrLeft(student, $event.target.checked)"></td>
        <td v-show="edit"><img src="@/assets/delete.png" v-on:click="deleteStudent"></td>
    </tr>
</template>

<script>
    export default {
        name: "StudentRow",
        props: {
            student: Object,
            edit: Boolean
        },
        methods: {
            arrivedOrLeft(student, present) {
                // TODO emit message to parent StudentTable.vue
                this.$emit('student-arrived-or-left', student, present)
            },
            deleteStudent() {
                if(confirm(`Delete ${this.student.name}?`))
                {
                  this.$emit('delete-student', this.student)
                }
            }
        }
    }
</script>


<style scoped>
    .present {
        color: navy;
        font-style: italic;
        background-color: lightgreen;
    }

    .absent {
        color: black;
        font-weight: bold;
    }

    img {
        height: 25px  ;
    }
</style>