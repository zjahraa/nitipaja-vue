<template>
    <Sidebar></Sidebar>
    <div class="navbar"></div>
    <div class="body-content">
        <div 
            v-for="item in itemlist" :key="item.id"
            class="card"
            :class="{'has-background-success-light' : item.done}"
        >
            <!-- Konten kartu -->
        </div>
    </div>
</template>

<script>
import { useAuthState, db } from "../firebase";
import { ref, onMounted } from "vue";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const datalistCollectionRef = collection(db, "Product");
const datalistCollectionQuery = query(datalistCollectionRef, orderBy("id", "desc"));

export default {
    name: "ProsesPage",
    setup() {
        const { user } = useAuthState();
        const itemlist = ref([]);

        onMounted(() => {
            onSnapshot(datalistCollectionQuery, (querySnapshot) => {
                let tmpArr = [];
                querySnapshot.forEach((doc) => {
                    const tmpItem = {
                        id: doc.data().id,
                        destination: doc.data().destination,
                        category: doc.data().category,
                        item: doc.data().item,
                        order: doc.data().order
                    };
                    tmpArr.push(tmpItem);
                });
                itemlist.value = tmpArr;
            });
        });

        return { user, itemlist };
    },
};
</script>

<style>

</style>
