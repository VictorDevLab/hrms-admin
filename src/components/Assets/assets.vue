<template>
    <v-row>
        <!-- Left Column - Asset Listing -->
        <v-col cols="12" md="6">
            <v-card class="h-100">
                <v-card-title class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                        <v-avatar color="primary" size="32" class="mr-3">
                            <v-icon>mdi-clipboard-list</v-icon>
                        </v-avatar>
                        <span class="text-h6">All Assets</span>
                    </div>
                </v-card-title>

                <v-card-text>
                    <!-- Search -->
                    <v-text-field v-model="searchTerm" prepend-inner-icon="mdi-magnify" label="Search"
                        variant="outlined" density="compact" class="mb-4" hide-details></v-text-field>



                    <!-- Asset List -->
                    <div style="max-height: 400px; overflow-y: auto;">
                        <v-card v-for="asset in filteredAssets" :key="asset._id"
                            :class="['mb-3', { 'border-primary': selectedAsset?._id === asset._id }]" variant="outlined"
                            @click="handleAssetClick(asset)" style="cursor: pointer;">
                            <v-card-text class="pa-4">
                                <div class="d-flex align-center justify-space-between">
                                    <div class="flex-grow-1">
                                        <div class="d-flex align-center mb-2">
                                            <span class="text-subtitle-1 font-weight-medium mr-3">{{ asset.assetName
                                                }}</span>
                                            <v-chip :color="getStatusColor(asset.status)" size="small" variant="flat">
                                                <v-icon :icon="getStatusIcon(asset.status)" size="small"
                                                    class="mr-1"></v-icon>
                                                {{ asset.status }}
                                            </v-chip>
                                        </div>
                                        <div class="text-body-2 text-medium-emphasis mb-1">
                                            {{ asset.assetType }} - {{ asset.assetCode }}
                                        </div>
                                        <div class="text-caption text-medium-emphasis">{{ asset.location }}</div>
                                        <div v-if="asset.assignedTo" class="d-flex align-center mt-2">
                                            <span class="text-caption text-medium-emphasis mr-2">Assigned to:</span>
                                            <span class="text-caption font-weight-medium text-primary">{{
                                                asset.assignedTo.name }}</span>
                                        </div>
                                    </div>
                                    <v-avatar v-if="asset.assignedTo" color="primary" size="32">
                                        <v-icon>mdi-account</v-icon>
                                    </v-avatar>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>

        <!-- Right Column - Asset Details/Form -->
        <v-col cols="12" md="6">
            <v-card class="h-100">
                <!-- Form Mode or Asset Selected -->
                <div v-if="isFormMode || selectedAsset">
                    <v-card-title class="d-flex align-center justify-space-between">
                        <span class="text-h6">{{ isFormMode ? 'Add New Asset' : 'Edit Asset' }}</span>
                        <v-btn icon size="small" @click="resetForm">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>

                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="formData.assetName" label="Asset Name *" variant="outlined"
                                        required :rules="[v => !!v || 'Asset name is required']"></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-select v-model="formData.assetType" label="Asset Type *" variant="outlined"
                                        :items="assetTypes" required
                                        :rules="[v => !!v || 'Asset type is required']"></v-select>
                                </v-col>

                                <v-col cols="12">
                                    <v-select v-model="formData.status" label="Status *" variant="outlined"
                                        :items="statusList" required></v-select>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field v-model="formData.assignedTo" label="Assigned To"
                                        variant="outlined"></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field v-model="formData.location" label="Location"
                                        variant="outlined"></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-textarea v-model="formData.description" label="Description" variant="outlined"
                                        rows="4"></v-textarea>
                                </v-col>

                                <v-col cols="12">
                                    <div class="d-flex gap-3">
                                        <v-btn color="primary" @click="handleFormSubmit"
                                            :disabled="!formData.assetName || !formData.assetType" class="flex-grow-1">
                                            {{ isFormMode ? 'Add Asset' : 'Update Asset' }}
                                        </v-btn>
                                        <v-btn variant="outlined" @click="resetForm" class="flex-grow-1">
                                            Cancel
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </div>

                <!-- Empty State -->
                <div v-else class="h-100 pa-5">
                    <!-- Status Cards Row 1 -->
                    <v-row class="d-flex align-right">
                        <v-col cols="8">

                        </v-col>
                        <v-col cols="4" align="right" class="d-flex align-center justify-end">
                            <v-btn icon size="small" class="mr-2">
                                <v-icon>mdi-account-group</v-icon>
                            </v-btn>
                            <v-btn icon size="small" class="mr-2">
                                <v-icon>mdi-microsoft-excel</v-icon>
                            </v-btn>
                            <v-btn icon size="small" color="primary" @click="handleAddNew">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mb-4">
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="blue-lighten-4" size="40" class="mr-3">
                                        <v-icon color="blue">mdi-clipboard-list</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">{{ statusCounts.all }}</div>
                                        <div class="text-caption text-medium-emphasis">All</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="green-lighten-4" size="40" class="mr-3">
                                        <v-icon color="green">mdi-account-check</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">{{ statusCounts.assigned }}</div>
                                        <div class="text-caption text-medium-emphasis">Assigned</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="red-lighten-4" size="40" class="mr-3">
                                        <v-icon color="red">mdi-alert-circle</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">{{ statusCounts.damaged }}</div>
                                        <div class="text-caption text-medium-emphasis">Damaged</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Status Cards Row 2 -->
                    <v-row class="mb-4">
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="blue-lighten-4" size="40" class="mr-3">
                                        <v-icon color="blue">mdi-gift</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">4</div>
                                        <div class="text-caption text-medium-emphasis">Donated</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="orange-lighten-4" size="40" class="mr-3">
                                        <v-icon color="orange">mdi-wrench</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">2</div>
                                        <div class="text-caption text-medium-emphasis">Repair</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="4">
                            <v-card variant="outlined">
                                <v-card-text class="d-flex align-center pa-3">
                                    <v-avatar color="green-lighten-4" size="40" class="mr-3">
                                        <v-icon color="green">mdi-cash</v-icon>
                                    </v-avatar>
                                    <div>
                                        <div class="text-h5 font-weight-bold">40</div>
                                        <div class="text-caption text-medium-emphasis">Sold</div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <!-- Status Filter Chips -->
                    <v-chip-group v-model="statusFilter" class="mb-4">
                        <v-chip v-for="status in statusOptions" :key="status" :value="status" variant="outlined"
                            size="small">
                            {{ status }}
                        </v-chip>
                    </v-chip-group>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref, computed, reactive } from 'vue';
import axiosInstance from '@/axios';
const assets = ref([
    {
        _id: '1',
        assetName: 'Computer',
        assetType: 'Access',
        assetCode: 'NNACC-009',
        assignedTo: { name: 'Bryan Parker', avatar: '👤' },
        assignedDate: '2024-01-15',
        status: 'Assigned',
        description: 'Dell Laptop for development work',
        location: 'Marina Plaza, Dubai'
    },
    {
        _id: '2',
        assetName: 'Accessories',
        assetType: 'Computer',
        assetCode: 'NNCOMPUTERRR-004',
        assignedTo: null,
        assignedDate: null,
        status: 'Available',
        description: 'Wireless mouse and keyboard set',
        location: 'Marina Plaza, Dubai'
    },
    {
        _id: '3',
        assetName: 'Accessories',
        assetType: 'Computer',
        assetCode: 'NNCOMPUTERRR-003',
        assignedTo: null,
        assignedDate: null,
        status: 'Available',
        description: 'USB Hub and cables',
        location: 'Sky Tower, Abu Dhabi'
    },
    {
        _id: '4',
        assetName: 'Computer',
        assetType: 'Access',
        assetCode: 'NNACC-008',
        assignedTo: null,
        assignedDate: null,
        status: 'Maintenance',
        description: 'Desktop computer for office use',
        location: 'Dubai Investment Park'
    },
    {
        _id: '5',
        assetName: 'Computer',
        assetType: 'Access',
        assetCode: 'NNACC-007',
        assignedTo: { name: 'Sarah Johnson', avatar: '👤' },
        assignedDate: '2024-02-10',
        status: 'Assigned',
        description: 'MacBook Pro for design work',
        location: 'Marina Plaza, Dubai'
    }
]);

const selectedAsset = ref(null);
const isFormMode = ref(false);
const searchTerm = ref('');
const statusFilter = ref('All');

// Form data
const formData = reactive({
    assetName: '',
    assetType: '',
    assignedTo: '',
    status: 'Available',
    description: '',
    location: ''
});

// Options
const statusOptions = ['All', 'Available', 'Assigned', 'Maintenance', 'Retired'];
const assetTypes = ['Computer', 'Access', 'Accessories', 'Furniture', 'Equipment'];
const statusList = ['Available', 'Assigned', 'Maintenance', 'Retired'];

// Computed properties
const statusCounts = computed(() => ({
    all: assets.value.length,
    assigned: assets.value.filter(asset => asset.status === 'Assigned').length,
    damaged: assets.value.filter(asset => asset.status === 'Maintenance').length
}));

const filteredAssets = computed(() => {
    return assets.value.filter(asset => {
        const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            asset.assetType.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesStatus = statusFilter.value === 'All' || asset.status === statusFilter.value;
        return matchesSearch && matchesStatus;
    });
});

// Methods
const handleAssetClick = (asset) => {
    selectedAsset.value = asset;
    isFormMode.value = false;
    Object.assign(formData, {
        assetName: asset.assetName,
        assetType: asset.assetType,
        assignedTo: asset.assignedTo?.name || '',
        status: asset.status,
        description: asset.description,
        location: asset.location
    });
};

const handleAddNew = () => {
    selectedAsset.value = null;
    isFormMode.value = true;
    Object.assign(formData, {
        assetName: '',
        assetType: '',
        assignedTo: '',
        status: 'Available',
        description: '',
        location: ''
    });
};

const handleFormSubmit = () => {
    if (!formData.assetName || !formData.assetType) {
        alert('Please fill in required fields');
        return;
    }

    if (selectedAsset.value) {
        // Update existing asset
        const index = assets.value.findIndex(asset => asset._id === selectedAsset.value._id);
        if (index !== -1) {
            assets.value[index] = {
                ...assets.value[index],
                ...formData,
                assignedTo: formData.assignedTo ? { name: formData.assignedTo } : null
            };
        }
         
    } else {
        // Add new asset
        const newAsset = {
            _id: Date.now().toString(),
            ...formData,
            assetCode: `ASSET-${Date.now()}`,
            assignedTo: formData.assignedTo ? { name: formData.assignedTo } : null,
            assignedDate: formData.assignedTo ? new Date().toISOString().split('T')[0] : null
        };
        assets.value.push(newAsset);
    }
    resetForm();
};

const resetForm = () => {
    isFormMode.value = false;
    selectedAsset.value = null;
    Object.assign(formData, {
        assetName: '',
        assetType: '',
        assignedTo: '',
        status: 'Available',
        description: '',
        location: ''
    });
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Assigned': return 'green';
        case 'Available': return 'blue';
        case 'Maintenance': return 'orange';    
        case 'Retired': return 'grey';
        default: return 'grey';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'Assigned': return 'mdi-account-check';
        case 'Available': return 'mdi-check-circle';
        case 'Maintenance': return 'mdi-wrench';
        case 'Retired': return 'mdi-archive';
        default: return 'mdi-help-circle';
    }
};
</script>