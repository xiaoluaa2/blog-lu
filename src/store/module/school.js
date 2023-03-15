import { defineStore } from 'pinia';
//参数1：定义一个仓库的唯一id名，Pinia会将所有的容器挂载到根容器；参数2：选项对象
const school = defineStore('school', {
    state: () => {
        //state必须是函数，是避免在服务端渲染时的交叉请求导致的状态数据污染；必须是箭头函数，为了更好的TS类型推导
        return {
            school: {
                schoolroll: null,
                school_id: '',
            },
        };
    },
    getters: {
        schoolList() {
            //在TS文件下，getters使用了this,则必须指定类型，否则会导致推导错误
            console.log(this.school.schoolroll);
            if (this.school.schoolroll) {
                return this.school.schoolroll.map((item) => {
                    return {
                        label: item.school_name_text,
                        value: item.school_id,
                    };
                });
            }
        },
    },
    actions: {
        setSchoolroll(schoolroll) {
            this.school.schoolroll = schoolroll;
        },
        setSchoolID(id) {
            this.school.school_id = id;
        },
    },
    persist: true,
});
export default school;
//# sourceMappingURL=school.js.map